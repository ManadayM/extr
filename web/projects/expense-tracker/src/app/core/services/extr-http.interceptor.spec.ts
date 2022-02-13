import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExtrHttpInterceptor } from './extr-http.interceptor';
import { ExpenseService, LocalStorageService } from '.';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('ExtrHttpInterceptor', () => {
  let expenseService: ExpenseService;
  let localStorageService: LocalStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExtrHttpInterceptor,
        AuthService,
        LocalStorageService,
        ExpenseService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ExtrHttpInterceptor,
          multi: true
        }
      ],
    });

    localStorageService = TestBed.inject(LocalStorageService);
    expenseService = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorageService.setItem('extrJWT', 'abc');
  });

  it('should be created', () => {
    const interceptor: ExtrHttpInterceptor = TestBed.inject(ExtrHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add an access token header', () => {
    expenseService.getExpenses().subscribe(res => {
      expect(res).toBeTruthy()
    });

    const httpRequest = httpMock.expectOne(`http://localhost:3000/expenses`);
    expect(httpRequest.request.headers.has('x-access-token')).toEqual(true);
  });
});
