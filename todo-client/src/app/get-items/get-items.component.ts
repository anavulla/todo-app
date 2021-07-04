import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sort } from "@angular/material/sort";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../_services/item.service';
import Item from '../_models/Item';
import { faPlusCircle, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ViewItemComponent } from '../view-item/view-item.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-get-items',
  templateUrl: './get-items.component.html',
  styleUrls: ['./get-items.component.css']
})
export class GetItemsComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog, private itemService: ItemService, private spinner: NgxSpinnerService) {
    this.createForm();
  }


  public searchText: string;
  items: Item[];
  closeResult: string;
  p: any;

  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [],
      is_done: ['', Validators.required],
      to_do_date: []
    });

  }

  sortData(sort: Sort) {
    const data = this.items.slice();
    if (!sort.active || sort.direction === '') {
      this.items = data;
      return;
    }

    this.items = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'is_done': return compare(a.is_done, b.is_done, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.itemService.getToDoItems().subscribe((data: Item[]) => {
      this.items = data;

      // default sort to name
      this.sortData({ active: "name", direction: "asc" });
    });
    this.spinner.hide();
  }

  viewItem(item) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = '1500px';

    dialogConfig.data = {
      item
    };

    this.matDialog.open(ViewItemComponent, dialogConfig);
  }

  deleteItem(item) {
    this.spinner.show();
    this.itemService.deleteItem(item).subscribe(res => {
      location.reload();
    });
    this.spinner.hide();
  }

  updateItem(item: MatSlideToggleChange) {
    this.spinner.show();
    this.itemService.updateItem(item).subscribe(res => {
      // location.reload();
    });
    this.spinner.hide();
  }

  showOptions(event: MatCheckboxChange): void {
    // set the event value to searchText for grdFilter to handle
    if (event.checked) {
      this.searchText = "false";
    }else{
      this.searchText = '';
    }
  }

}


function compare(a: number | string | boolean | Date | String | Boolean, b: number | string | boolean | Date | String | Boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



