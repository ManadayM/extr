import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/services';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj(AuthService, ['loggedIn']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{
        provide: AuthService,
        useValue: authSpy
      }]
    });

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
