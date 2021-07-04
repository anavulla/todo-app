import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private itemService: ItemService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [],
      to_do_date: new FormControl()
    });

  }

  addItem() {
    this.itemService.addItem(this.itemForm.value.name, false, this.itemForm.value.details, this.itemForm.value.to_do_date).subscribe(
      res => {
        console.log(res);
        if (res['itemId'] > "0") {
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
  }

}
