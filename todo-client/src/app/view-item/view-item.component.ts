import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Item from '../_models/Item';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  name: string;
  is_done: boolean;
  details: string;
  to_do_date: string;

  constructor(private matDialogRef: MatDialogRef<ViewItemComponent>, @Inject(MAT_DIALOG_DATA) private item: Item) { }

  close() {
    this.matDialogRef.close();
  }

  ngOnInit(): void {

    this.name = Object['values'](this.item)[0].name;
    this.is_done = Object['values'](this.item)[0].is_done;
    this.details = Object['values'](this.item)[0].details;
    this.to_do_date = Object['values'](this.item)[0].to_do_date;
  }

}
