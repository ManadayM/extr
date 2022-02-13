import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExtrHttpInterceptor } from './extr-http.interceptor';

describe('ExtrHttpInterceptor', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExtrHttpInterceptor],
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: ExtrHttpInterceptor =
      TestBed.inject(ExtrHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
