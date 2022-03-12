import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  body?: string;
  okButtonText?: string;
  okButtonStyle?: 'primary' | 'accent' | 'warn';
  cancelButtonText?: string;
}

@Component({
  template: `
    <h1 mat-dialog-title>{{ data?.title || 'Confirm' }}</h1>
    <div mat-dialog-content>
      <p>{{ data?.body || 'Are you sure?' }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onCancel()">
        {{ data?.cancelButtonText || 'Cancel' }}
      </button>
      <button
        mat-raised-button
        [color]="data?.okButtonStyle || ''"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        {{ data?.okButtonText || 'OK' }}
      </button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: DialogData,
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }
}
