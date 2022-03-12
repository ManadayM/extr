import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense.component';
import { UnsavedExpenseGuard } from './unsaved-expense.guard';

const routes: Routes = [
  { path: '', canDeactivate: [UnsavedExpenseGuard], component: AddExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExpenseRoutingModule { }
