import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get(this.apiUrl);
  }
}
