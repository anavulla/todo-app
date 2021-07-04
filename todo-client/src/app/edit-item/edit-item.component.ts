import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemForm: FormGroup;
  item: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [],
      is_done: ['', Validators.required],
      to_do_date: []
    });

  }

  updateItem(item) {
    this.itemService.updateItem(item).subscribe(
      res => {
        console.log(res);
        if (res['itemId'] === item.itemId) {
          this.router.navigate(['']);
        }
      },
      err => {
        console.error(err);
        alert("There is an error adding To-Do Item!!")
      }
    );

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemService.getItem(params['itemId']).subscribe(res => {
        this.item = res;
      });
    });

  }

}
