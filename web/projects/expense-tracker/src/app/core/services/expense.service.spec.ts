import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getExpenses', () => {
    it('should get expenses list', () => {
      const testData = [
        {
          amount: 10,
          name: 'Fruits',
          expenseDate: '2022-01-28T18:30:00.000Z',
        },
      ];

      service.getExpenses().subscribe((res) => {
        expect(res).toBeTruthy();
      });

      const req = httpTestingController.expectOne('http://localhost:3000/expenses');

      expect(req.request.method).toEqual('GET');

      req.flush(testData);

      httpTestingController.verify();
    });
  });
});
