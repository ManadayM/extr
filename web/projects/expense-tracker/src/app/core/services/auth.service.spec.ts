import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '.';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useValue: spy,
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    localStorageServiceSpy = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('loggedIn', () => {
    it('should return true if token is available in local storage', () => {
      let mockedTokenValue = 'abc';
      localStorageServiceSpy.getItem.and.returnValue(mockedTokenValue);

      expect(authService.loggedIn())
        .withContext('Auth Service -> loggedIn returned true')
        .toBeTrue();

      expect(localStorageServiceSpy.getItem.calls.count())
        .withContext('localStorage spy methods called once')
        .toBe(1);

      expect(
        localStorageServiceSpy.getItem.calls.mostRecent().returnValue
      ).toBe(mockedTokenValue);
    });

    it('should return false if token is not available in local storage', () => {
      localStorageServiceSpy.getItem.and.returnValue(null);

      expect(authService.loggedIn())
        .withContext('Auth Service -> loggedIn returned false')
        .toBeFalse();

      expect(localStorageServiceSpy.getItem.calls.count())
        .withContext('localStorage spy methods called once')
        .toBe(1);

      expect(
        localStorageServiceSpy.getItem.calls.mostRecent().returnValue
      ).toBe(null);
    });
  });

  describe('getToken', () => {
    it('should return token if token is available in local storage', () => {
      let mockedTokenValue = 'abc';
      localStorageServiceSpy.getItem.and.returnValue(mockedTokenValue);

      expect(authService.getToken())
        .withContext('Auth Service -> getToken returned token from storage')
        .toEqual(mockedTokenValue);

      expect(localStorageServiceSpy.getItem.calls.count())
        .withContext('localstorage spy methods called once')
        .toBe(1);

      expect(
        localStorageServiceSpy.getItem.calls.mostRecent().returnValue
      ).toBe(mockedTokenValue);
    });

    it('should return empty string if token is not available in local storage', () => {
      localStorageServiceSpy.getItem.and.returnValue(null);

      expect(authService.getToken())
        .withContext('Auth Service -> getToken returned empty string')
        .toBe('');

      expect(localStorageServiceSpy.getItem.calls.count())
        .withContext('localstorage spy methods called once')
        .toBe(1);

      expect(
        localStorageServiceSpy.getItem.calls.mostRecent().returnValue
      ).toBe(null);
    });
  });

});
