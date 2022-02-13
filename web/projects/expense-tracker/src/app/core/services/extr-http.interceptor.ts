import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '.';

@Injectable()
export class ExtrHttpInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // fetch token from localstorage
    const jwtToken: string | null = this.localStorage.getItem('extrJWT') as string;

    // add token as request header
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          "x-access-token": jwtToken
        }
      });
    }

    return next.handle(request);
  }
}
