import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpenseViewComponent } from './expense-view/expense-view.component';

const routes: Routes = [
  { path: 'view', component: ExpenseViewComponent },
  { path: 'edit', component: ExpenseEditComponent },
  { path: '', redirectTo: 'view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseDetailRoutingModule { }
