import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ICategory } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.apiUrl)
      .pipe(
        tap(res => console.log(res))
      )
  }
}
