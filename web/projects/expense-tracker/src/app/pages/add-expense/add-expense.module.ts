import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { AddExpenseRoutingModule } from './add-expense-routing.module';
import { AddExpenseComponent } from './add-expense.component';
import { ConfirmDialogModule } from '@extr/shared';
import { UnsavedExpenseGuard } from './unsaved-expense.guard';

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
  declarations: [AddExpenseComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,

    AddExpenseRoutingModule,
    ConfirmDialogModule
  ],
  providers: [
    UnsavedExpenseGuard,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
  ],
})
export class AddExpenseModule {}
