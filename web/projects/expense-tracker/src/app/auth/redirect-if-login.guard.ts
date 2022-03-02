import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@extr/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectIfLoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.isLoggedIn) {
      // Redirect to dashboard if user is already logged in.
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
