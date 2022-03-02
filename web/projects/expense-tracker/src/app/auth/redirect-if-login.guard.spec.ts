import { TestBed } from '@angular/core/testing';

import { RedirectIfLoginGuard } from './redirect-if-login.guard';

describe('RedirectIfLoginGuard', () => {
  let guard: RedirectIfLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectIfLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
