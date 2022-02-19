import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseService } from '@extr/core';
import { SubSink } from "subsink";

@Component({
  selector: 'xtr-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.expenseService.getExpenses().subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
