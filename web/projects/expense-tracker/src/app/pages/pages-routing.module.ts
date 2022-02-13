import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'expenses/:id', loadChildren: () => import('./expense-detail/expense-detail.module').then(m => m.ExpenseDetailModule) },
      { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule) },
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
