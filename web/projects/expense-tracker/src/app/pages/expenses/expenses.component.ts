import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { SubSink } from 'subsink';

import { ExpenseService, IDayExpenseRecord, IExpenses, IExpenseSummary } from '@extr/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'xtr-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  public date = new FormControl({ value: new Date(), disabled: true });
  public dayRecords!: IDayExpenseRecord[];
  public summary!: IExpenseSummary;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const queryParamMap = this.route.snapshot.queryParamMap;
    const month = parseInt(queryParamMap.get('month') || `${today.getMonth() + 1}`);
    const year = parseInt(queryParamMap.get('year') || `${today.getFullYear()}`);

    this.date.setValue(new Date(year, month - 1));

    this.fetchExepnses(month, year);
  }

  fetchExepnses(month?: number, year?: number) {
    this.subs.sink = this.expenseService.getExpenses(month, year)
      .subscribe((res: IExpenses) => {
        this.dayRecords = res.expenses;
        this.summary = res.summary;
      });
  }

  chosenYearHandler(event: Date) {
    const ctrlValue = this.date.value;
    ctrlValue.setYear(event.getFullYear());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(event: Date, datepicker: MatDatepicker<Date>) {
    const ctrlValue = this.date.value;
    ctrlValue.setMonth(event.getMonth());
    this.date.setValue(ctrlValue);
    datepicker.close();

    const month = ctrlValue.getMonth() + 1;
    const year = ctrlValue.getFullYear();
    this.router.navigate([], { relativeTo: this.route, queryParams: { month, year } })
    this.fetchExepnses(month, year);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
