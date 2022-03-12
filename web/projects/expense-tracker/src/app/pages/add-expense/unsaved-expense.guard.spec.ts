import { TestBed } from '@angular/core/testing';

import { UnsavedExpenseGuard } from './unsaved-expense.guard';

describe('UnsavedExpenseGuard', () => {
  let guard: UnsavedExpenseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedExpenseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
