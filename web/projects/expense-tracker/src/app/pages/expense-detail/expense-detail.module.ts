import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseDetailRoutingModule } from './expense-detail-routing.module';
import { ExpenseViewComponent } from './expense-view/expense-view.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';


@NgModule({
  declarations: [
    ExpenseViewComponent,
    ExpenseEditComponent
  ],
  imports: [
    CommonModule,
    ExpenseDetailRoutingModule
  ]
})
export class ExpenseDetailModule { }
