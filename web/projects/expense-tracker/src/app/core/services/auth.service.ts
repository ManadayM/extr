import { Injectable } from '@angular/core';

import { LocalStorageService } from '.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_TOKEN = 'extrJWT';

  constructor(private localStorage: LocalStorageService) { }

  loggedIn() {
    return !!this.localStorage.getItem(this.JWT_TOKEN);
  }

  getToken() {
    return this.localStorage.getItem(this.JWT_TOKEN) || '';
  }
}
