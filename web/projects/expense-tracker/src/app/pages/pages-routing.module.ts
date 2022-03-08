import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule) },
      { path: 'expenses/new', loadChildren: () => import('./add-expense/add-expense.module').then(m => m.AddExpenseModule) },
      { path: 'expenses/:id/edit', loadChildren: () => import('./add-expense/add-expense.module').then(m => m.AddExpenseModule) },
      { path: '', redirectTo: 'expenses', pathMatch: 'full' },
      { path: '**', redirectTo: 'expenses' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
