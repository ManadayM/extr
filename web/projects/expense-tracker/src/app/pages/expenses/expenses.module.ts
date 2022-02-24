import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { DayRecordComponent } from './day-record/day-record.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';


@NgModule({
  declarations: [
    ExpensesComponent,
    DayRecordComponent,
    ExpenseRecordComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    MatExpansionModule,
    MatListModule,
  ]
})
export class ExpensesModule { }
