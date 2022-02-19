import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExtrHttpInterceptor } from './extr-http.interceptor';
import { ExpenseService } from '.';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('ExtrHttpInterceptor', () => {
  let expenseService: ExpenseService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj(AuthService, ['loggedIn', 'getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExtrHttpInterceptor,
        {
          provide: AuthService,
          useValue: authSpy,
        },
        ExpenseService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ExtrHttpInterceptor,
          multi: true,
        },
      ],
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    expenseService = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Assert that there are no pending requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor: ExtrHttpInterceptor = TestBed.inject(ExtrHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add an access token header if user is logged in', () => {
    const mockedTokenValue = 'mockedToken';
    authServiceSpy.loggedIn.and.returnValue(true);
    authServiceSpy.getToken.and.returnValue(mockedTokenValue);

    expenseService.getExpenses().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`http://localhost:3000/expenses`);
    expect(httpRequest.request.headers.has('x-access-token'))
      .withContext('x-access-token is present')
      .toEqual(true);

    // Executing this statement will actually resolved the observer,
    // until then the assertion inside the subscript block will not be executed
    // As we are testing the interceptor service,
    //  we are not concerned about the response of the request so returning blank object
    httpRequest.flush({});

    expect(authServiceSpy.loggedIn.calls.count())
      .withContext('AuthService spy method loggedIn called once')
      .toBe(1);

    expect(authServiceSpy.getToken.calls.count())
      .withContext('AuthService spy method getToken called once')
      .toBe(1);

    expect(authServiceSpy.getToken.calls.mostRecent().returnValue)
      .withContext('AuthService spy method getToken return expected string')
      .toBe(mockedTokenValue);
  });

  it('should not add an access token header if user is not logged in', () => {
    authServiceSpy.loggedIn.and.returnValue(false);

    expenseService.getExpenses().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`http://localhost:3000/expenses`);
    expect(httpRequest.request.headers.has('x-access-token')).not.toEqual(true);

    httpRequest.flush({});

    expect(authServiceSpy.loggedIn.calls.count())
      .withContext('AuthService spy method loggedIn called once')
      .toBe(1);

    expect(authServiceSpy.getToken)
      .withContext('AuthService spy method getToken should not be called')
      .not.toHaveBeenCalled();
  });
});
