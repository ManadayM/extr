import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBaseExpense, IExpense } from '@extr/core';
import { environment } from '@extr/env';
import { IExpenses } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `${environment.apiBaseUrl}/expenses`;

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
  getExpenses(month?: number, year?: number): Observable<IExpenses> {

    const today = new Date();
    const params = new HttpParams()
      .set('month', month || (today.getMonth() + 1))
      .set('year', year || today.getFullYear());

    return this.http.get<IExpense[]>(this.apiUrl, { params })
      .pipe(
        map((data: IExpense[]) => {

          return data.reduce((result: any, expenseRecord: any) => {
            const { expenseDate, ...rest } = expenseRecord;

            result[expenseDate] = result[expenseDate] || { expenseDate, totalAmount: 0, expenses: [] };
            result[expenseDate].totalAmount += expenseRecord.amount;
            result[expenseDate].expenses.push(rest);

            // Push and add current expense's amount to the total time range's amount
            result.summary.totalAmount += expenseRecord.amount;

            // Set start date since when the expenses for the time range started.
            if (!result.summary.startDate) {
              result.summary.startDate = expenseDate;
            }

            // Category-wise total amount
            if (!result.summary.categories[expenseRecord.categoryId]) {
              result.summary.categories[expenseRecord.categoryId] = {
                categoryId: expenseRecord.categoryId,
                categoryName: expenseRecord.categoryName,
                totalAmount: expenseRecord.amount
              };
            }
            else {
              result.summary.categories[expenseRecord.categoryId].totalAmount += expenseRecord.amount;
            }

            return result;
          }, { summary: { totalAmount: 0, categories: {} } })
        }),

        // tap((res: any) => console.log(res)),

        map(data => {
          const { summary, ...expenses } = data;
          return {
            summary: { ...summary, categories: Object.values(summary.categories) },
            expenses: Object.values(expenses)
          }
        }),

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
