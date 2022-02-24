import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';

import { IDayExpenseRecord } from '@extr/core';

@Component({
  selector: 'xtr-day-record',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './day-record.component.html',
  styleUrls: ['./day-record.component.scss']
})
export class DayRecordComponent implements OnInit, OnChanges {

  @Input() data!: IDayExpenseRecord;

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
