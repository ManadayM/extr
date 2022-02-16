import { Injectable } from '@angular/core';

import { LocalStorageService } from '.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_TOKEN = 'extrJWT';

  constructor(
    private localStorage: LocalStorageService
  ) { }

  loggedIn(): boolean {
    return !!this.localStorage.getItem(this.JWT_TOKEN);
  }

  getToken(): string {
    return (this.localStorage.getItem(this.JWT_TOKEN) as string) || "";
  }
}
