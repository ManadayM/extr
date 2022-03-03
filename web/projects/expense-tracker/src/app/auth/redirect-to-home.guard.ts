import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@extr/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectToHomeGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {

    if (this.authService.isLoggedIn) {
      // Redirect to dashboard if user is already logged in.
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
