import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService, IDayExpenseRecord, IExpenses, IExpenseSummary } from '@extr/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'xtr-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  dayRecords!: IDayExpenseRecord[];
  summary!: IExpenseSummary;

  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.expenseService.getExpenses()
      .subscribe((res: IExpenses) => {
        this.dayRecords = res.expenses;
        this.summary = res.summary;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
