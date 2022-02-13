import { TestBed } from '@angular/core/testing';

import { ExtrHttpInterceptor } from './extr-http.interceptor';

describe('ExtrHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ExtrHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ExtrHttpInterceptor = TestBed.inject(ExtrHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
