import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { DayRecordComponent } from './day-record/day-record.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';
import { CategoryIconModule } from '@extr/shared';
import { SummaryRecordComponent } from './summary-record/summary-record.component';
import { ReactiveFormsModule } from '@angular/forms';

const MY_FORMATS = {
  parse: {
    dateInput: { year: 'numeric', month: 'numeric' },
  },
  display: {
    dateInput: { year: 'numeric', month: 'short' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'short' },
  },
};

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
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    /** App modules */
    ExpensesRoutingModule,
    CategoryIconModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpensesModule { }
