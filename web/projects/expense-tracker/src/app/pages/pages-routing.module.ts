import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule) },
      { path: 'expenses/:id', loadChildren: () => import('./expense-detail/expense-detail.module').then(m => m.ExpenseDetailModule) },
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
