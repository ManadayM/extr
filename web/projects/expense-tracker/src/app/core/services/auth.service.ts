import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocalStorageService } from '.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `http://localhost:3000/api/auth/login`;

  private JWT_TOKEN = 'extrJWT';

  get loginTokenKey() {
    return this.JWT_TOKEN;
  }

  get isLoggedIn() {
    return this.loggedIn();
  }

  public redirectUrl = '';

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }

  /**
   *
   * @returns
   *
   * { "email": "abc@xyz.com", "password": "password" }
   */
  login(email: string, password: string) {
    return this.http.post(this.loginUrl, { email, password })
  }

  loggedIn(): boolean {
    return !!this.localStorage.getItem(this.JWT_TOKEN);
  }



  getToken(): string {
    return (this.localStorage.getItem(this.JWT_TOKEN) as string) || '';
  }
}
