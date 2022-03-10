import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpenseService, CategoryService, ICategory } from '@extr/core';

@Component({
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
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

      this.subs.sink = this.expenseService.getExpenseById(id)
        .subscribe(expense => this.expenseForm.patchValue({ ...expense }))
    }
  }

  public categories: ICategory[] = [{ id: 10, name: 'Others', icon: '' }];

  public expenseForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
    categoryId: [10, [Validators.required]],
    details: ['', [Validators.maxLength(100)]],
    expenseDate: [new Date(), [Validators.required]],
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.subs.sink = this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.expenseId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
  }

  onExpenseSaved() {
    this.snackBar.open('Expense details saved successfully.');
    this.router.navigate(['/expenses']);
  }

  onSubmit() {
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
        .subscribe(() => this.onExpenseSaved());
    }
    else {
      this.subs.sink = this.expenseService
        .addExpense(expenseRecord)
        .subscribe(() => this.onExpenseSaved());
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
