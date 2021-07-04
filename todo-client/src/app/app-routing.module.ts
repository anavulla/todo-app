import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetItemsComponent } from './get-items/get-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';

const routes: Routes = [
  {
    path: '',
    component: GetItemsComponent
  },
  {
    path: 'item/add',
    component: AddItemComponent
  },
  {
    path: 'item/get/:itemId',
    component: EditItemComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }