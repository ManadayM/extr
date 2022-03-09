import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExpenseService } from '@extr/core';

@Component({
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  expenseForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
    categoryId: ['3', [Validators.required]],
    details: ['', [Validators.maxLength(100)]],
    expenseDate: [new Date(), [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private expenseService: ExpenseService,
  ) { }

  ngOnInit(): void {
    console.log(`Route loaded with id: ${this.route.snapshot.paramMap.get('id')}`)
  }

  onSubmit() {
    // console.log(this.expenseForm.value)

    if (!this.expenseForm.valid) {
      return;
    }

    this.subs.sink = this.expenseService
      .addExpense(this.expenseForm.value)
      .subscribe((_res: any) => {
        this.snackBar.open('Expense details saved successfully.');
        this.router.navigate(['/expenses']);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
