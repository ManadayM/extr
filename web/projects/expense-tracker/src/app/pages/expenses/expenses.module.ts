import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { DayRecordComponent } from './day-record/day-record.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';
import { CategoryIconModule } from '@extr/shared';
import { SummaryRecordComponent } from './summary-record/summary-record.component';

@NgModule({
  declarations: [
    ExpensesComponent,
    DayRecordComponent,
    ExpenseRecordComponent,
    SummaryRecordComponent
  ],
  imports: [
    /** Vendor modules */
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,

    /** App modules */
    ExpensesRoutingModule,
    CategoryIconModule,
  ]
})
export class ExpensesModule { }
