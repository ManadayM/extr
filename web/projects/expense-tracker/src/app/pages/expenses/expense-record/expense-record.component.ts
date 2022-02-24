import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { IExpense } from '@extr/core';

@Component({
  selector: 'xtr-expense-record',
  templateUrl: './expense-record.component.html',
  styleUrls: ['./expense-record.component.scss']
})
export class ExpenseRecordComponent implements OnInit, OnChanges {
  @Input() data!: IExpense;

  ngOnInit(): void {
    this.assertInputProps();
  }

  ngOnChanges(): void {
    this.assertInputProps();
  }

  assertInputProps() {
    if (!this.data) {
      throw new Error('Required input [data] not provided.');
    }
  }
}
