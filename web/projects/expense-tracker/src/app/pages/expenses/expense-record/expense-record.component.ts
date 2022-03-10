import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IExpense } from '@extr/core';

@Component({
  selector: 'xtr-expense-record',
  templateUrl: './expense-record.component.html',
  styleUrls: ['./expense-record.component.scss']
})
export class ExpenseRecordComponent implements OnInit, OnChanges {
  @Input() data!: IExpense;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.assertInputProps();
  }

  ngOnChanges(): void {
    this.assertInputProps();
  }

  editExpense() {
    this.router.navigate(['expenses', this.data.id, 'edit']);
  }

  assertInputProps() {
    if (!this.data) {
      throw new Error('Required input [data] not provided.');
    }
  }
}
