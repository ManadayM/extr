import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService, IDayExpenseRecord } from '@extr/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'xtr-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  dayRecords!: IDayExpenseRecord[];

  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.expenseService.getExpenses()
      .subscribe((res: IDayExpenseRecord[]) => {
        this.dayRecords = res;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
