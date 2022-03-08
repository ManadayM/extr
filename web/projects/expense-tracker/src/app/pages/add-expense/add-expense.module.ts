import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
// import { DateAdapter } from '@angular/material/core';
// import { DateFnsAdapter, MatDateFnsModule } from '@angular/material-date-fns-adapter';

import { AddExpenseRoutingModule } from './add-expense-routing.module';
import { AddExpenseComponent } from './add-expense.component';


const MY_FORMATS = {
  parse: {
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: { year: 'numeric', month: 'short', day: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'full' },
  },
};

@NgModule({
  declarations: [
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatDateFnsModule,

    AddExpenseRoutingModule,
  ],
  providers: [
    // { provide: DateAdapter, useClass: DateFnsAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AddExpenseModule { }
