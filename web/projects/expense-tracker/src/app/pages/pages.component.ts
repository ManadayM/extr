import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from '@extr/core';

@Component({
  selector: 'xtr-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  constructor(
    private localStorage: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.localStorage.removeItem(this.authService.loginTokenKey);
    this.router.navigate(['/auth/login']);
  }

}
