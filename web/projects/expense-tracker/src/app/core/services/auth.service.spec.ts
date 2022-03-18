import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '.';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const storageServiceSpy = jasmine.createSpyObj(LocalStorageService, ['getItem']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: LocalStorageService,
          useValue: storageServiceSpy,
        },
      ],
    });

    mockLocalStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('loggedIn', () => {
    it('should return true if token is available in the local storage', () => {
      const mockTokenValue = 'abc';
      mockLocalStorageService.getItem.and.returnValue(mockTokenValue);

      expect(authService.isLoggedIn).toBeTrue();
    });

    it('should return false if token is not available in the local storage', () => {
      mockLocalStorageService.getItem.and.returnValue(null);

      expect(authService.isLoggedIn).toBeFalse();
    });
  });

  describe('getToken', () => {
    it('should return token if token is available in local storage', () => {
      const mockTokenValue = 'abc';
      mockLocalStorageService.getItem.and.returnValue(mockTokenValue);

      expect(authService.getToken()).toEqual(mockTokenValue);
    });

    it('should return empty string if token is not available in local storage', () => {
      mockLocalStorageService.getItem.and.returnValue(null);

      expect(authService.getToken()).toBe('');
    });
  });
});
