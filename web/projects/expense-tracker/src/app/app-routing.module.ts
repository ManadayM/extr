import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RedirectToHomeGuard } from './auth/redirect-to-home.guard';

const routes: Routes = [
  { path: 'auth', canActivate: [RedirectToHomeGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
