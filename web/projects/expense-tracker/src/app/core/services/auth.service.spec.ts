import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let mockLocalStorageService: jasmine.SpyObj<any>;

  beforeEach(() => {
    mockLocalStorageService = jasmine.createSpyObj(['getItem']);

    authService = new AuthService(mockLocalStorageService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('loggedIn', () => {
    it('should return true if token is available in the local storage', () => {
      const mockTokenValue = 'abc';
      mockLocalStorageService.getItem.and.returnValue(mockTokenValue);

      expect(authService.loggedIn()).toBeTrue();
    });

    it('should return false if token is not available in the local storage', () => {
      mockLocalStorageService.getItem.and.returnValue(null);

      expect(authService.loggedIn()).toBeFalse();
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
