import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
import { first, map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '@extr/shared';
import { AddExpenseComponent } from './add-expense.component';

const dialogConfig = {
  data: {
    title: 'Unsaved Changes',
    body: 'You will loose all changes. Do you want to leave this page?',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    okButtonStyle: 'warn'
  }
};

@Injectable()
export class UnsavedExpenseGuard implements CanDeactivate<AddExpenseComponent> {

  constructor(private dialog: MatDialog) {
  }

  canDeactivate(
    component: AddExpenseComponent,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree | any> | Promise<boolean | UrlTree> {

    if (!component.isDirty) {
      // return confirm(`You will loose all changes. Do you want to leave this page?`);
      return true;
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      // Logic courtesy: https://stackoverflow.com/a/55849215/509482
      return dialogRef.afterClosed().pipe(map(result => !!result), first());
    }

  }
}
