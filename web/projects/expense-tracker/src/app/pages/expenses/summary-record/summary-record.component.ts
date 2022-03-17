import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IExpenseSummary } from '@extr/core';

@Component({
  selector: 'xtr-summary-record',
  templateUrl: './summary-record.component.html'
})
export class SummaryRecordComponent implements OnInit, OnChanges {

  @Input() data!: IExpenseSummary;

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
