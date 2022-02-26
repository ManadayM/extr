import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IExpense } from '..';

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
      const today = new Date();

      const testData: Array<IExpense> = [
        {
          amount: 10,
          categoryName: 'Fruits',
          expenseDate: today,
          categoryId: 1,
          id: 1,
          details: 'Mango'
        },
        {
          amount: 110,
          categoryName: 'Fruits',
          expenseDate: today,
          categoryId: 1,
          id: 2,
          details: 'Dragon Fruit'
        },
        {
          amount: 100,
          categoryName: 'vegetables',
          expenseDate: today,
          categoryId: 2,
          id: 3,
          details: 'Potato'
        },
      ];

      service.getExpenses().subscribe((res) => {
        expect(res).toBeTruthy();
      });

      const req = httpTestingController.expectOne('http://localhost:3000/api/expenses');

      expect(req.request.method).toEqual('GET');

      req.flush(testData);

      httpTestingController.verify();
    });
  });
});
