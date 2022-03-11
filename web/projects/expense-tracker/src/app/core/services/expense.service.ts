import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBaseExpense, IDayExpenseRecord, IExpense } from '@extr/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) { }


  /**
   * @returns
   *
   * Sample API Response
   * [ { "amount": 34.233, "name": "Grocery", "expenseDate": "2022-02-07" }, ...]
   *
   * Transformed Response
   * [ { "expenseDate": "2022-02-07", "total": 950, "expenses": [ {  } ] }, ...]
   */
  getExpenses(): Observable<IDayExpenseRecord[]> {
    return this.http.get<IExpense[]>(this.apiUrl)
      .pipe(
        map((data: IExpense[]) => {
          return data.reduce((result: any, expenseRecord: any) => {
            const { expenseDate, ...rest } = expenseRecord;

            result[expenseDate] = result[expenseDate] || { expenseDate, totalAmount: 0, expenses: [] };
            result[expenseDate].totalAmount += expenseRecord.amount;
            result[expenseDate].expenses.push(rest);

            return result;
          }, {})
        }),

        map(data => Object.values(data)),

        // tap((res: any) => console.log(res)),
      );
  }

  getExpenseById(expenseId: number): Observable<IExpense> {
    return this.http.get<IExpense>(`${this.apiUrl}/${expenseId}`)
      .pipe(
        // tap(res => console.log(res))
      );
  }

  addExpense(expenseRecord: any) {
    return this.http.post(this.apiUrl, expenseRecord)
      .pipe(
        // tap((res: any) => console.log(res)),
      );
  }

  updateExpense(expenseId: number, expenseRecord: IBaseExpense) {
    return this.http.put(`${this.apiUrl}/${expenseId}`, expenseRecord);
  }

  deleteExpense(expenseId: number) {
    return this.http.delete(`${this.apiUrl}/${expenseId}`);
  }

}
