import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpenseService, CategoryService, ICategory } from '@extr/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, } from '@extr/shared';

const dialogConfig = {
  data: {
    body: 'Are you sure to delete this expense?',
    okButtonText: 'Delete',
    okButtonStyle: 'warn'
  }
};

@Component({
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  private _expenseId = 0;

  public get expenseId() {
    return this._expenseId;
  }

  public set expenseId(id: number) {
    if (this.expenseId !== id) {
      this._expenseId = id;
      this.isEditMode = true;

      this.subs.sink = this.expenseService.getExpenseById(id)
        .subscribe(expense => this.expenseForm.patchValue({ ...expense }))
    }
  }

  public get isDirty() {
    return this.expenseForm.dirty;
  }

  public isEditMode = false;

  public categories: ICategory[] = [{ id: 35, name: 'Others', icon: '' }];

  public expenseForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
    categoryId: [35, [Validators.required]],
    details: ['', [Validators.maxLength(100)]],
    expenseDate: [new Date(), [Validators.required]],
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.subs.sink = this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.expenseId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
  }

  onExpenseSaved() {
    // Reset form to avoid prompting of unsaved changes on save operation.
    this.expenseForm.reset({
      amount: 0,
      categoryId: 35,
      details: '',
      expenseDate: this.expenseForm.value['expenseDate'] || new Date()
    });
    this.snackBar.open('Expense details saved successfully.');
  }

  onExpenseDeleted() {
    // Reset form to avoid prompting of unsaved changes on save operation.
    this.expenseForm.reset();

    this.snackBar.open('Expense details deleted successfully.');
    this.router.navigate(['/expenses']);
  }

  onSubmit(saveAndAddAnother = false) {
    if (!this.expenseForm.valid) {
      return;
    }

    // TODO: Improve the date transformation logic
    let { expenseDate } = this.expenseForm.value;
    expenseDate = new Date(expenseDate);
    expenseDate = `${expenseDate.getFullYear()}-${(expenseDate.getMonth() < 9 ? '0' : '') + (expenseDate.getMonth() + 1)}-${(expenseDate.getDate() < 10 ? '0' : '') + expenseDate.getDate()}`;
    const expenseRecord = { ...this.expenseForm.value, expenseDate: expenseDate };

    if (this.expenseId) {
      this.subs.sink = this.expenseService
        .updateExpense(this.expenseId, expenseRecord)
        .subscribe(() => {
          this.onExpenseSaved();
          this.router.navigate(['/expenses']);
        });
    }
    else {
      this.subs.sink = this.expenseService
        .addExpense(expenseRecord)
        .subscribe(() => {
          this.onExpenseSaved();
          // Don't redirect, if user wants to add one more expense.
          saveAndAddAnother === false && this.router.navigate(['/expenses']);
        });
    }
  }

  deleteExpense() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if (this.expenseId && result) {
        this.subs.sink = this.expenseService
          .deleteExpense(this.expenseId)
          .subscribe(() => this.onExpenseDeleted())
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
