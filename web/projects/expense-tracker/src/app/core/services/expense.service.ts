import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
  getExpenses() {
    return this.http.get(this.apiUrl)
      .pipe(
        map((data: any) => {
          return data.reduce((result: any, expenseRecord: any) => {
            const { expenseDate, ...rest } = expenseRecord;

            result[expenseDate] = result[expenseDate] || { expenseDate, totalAmount: 0, expenses: [] };
            result[expenseDate].totalAmount += expenseRecord.amount;
            result[expenseDate].expenses.push(rest);

            return result;
          }, {})
        }),

        //
        map(data => Object.values(data)),

        // tap((res: any) => console.log(res)),
      );
  }
}
