import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@extr/env';

import { ICategory } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiBaseUrl}/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.apiUrl)
      .pipe(
        // tap(res => console.log(res))
      )
  }
}
