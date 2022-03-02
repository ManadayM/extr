import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/services';

import { RedirectIfLoginGuard } from './redirect-if-login.guard';

describe('RedirectIfLoginGuard', () => {
  let guard: RedirectIfLoginGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj(AuthService, ['getItem']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{
        provide: AuthService,
        useValue: authSpy
      }]
    });

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>

    guard = TestBed.inject(RedirectIfLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
