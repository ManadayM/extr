import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseService, IExpenses } from '@extr/core';
import { of } from 'rxjs';
import { CategoryIconModule } from '../../shared/components';
import { DayRecordComponent } from './day-record/day-record.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';

import { ExpensesComponent } from './expenses.component';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  const testData: IExpenses = {
    summary: {
      totalAmount: 700,
      categories: [
        {
          categoryId: 1,
          categoryName: 'Fruits',
          totalAmount: 700,
        },
      ],
      startDate: new Date('2022-03-10'),
    },
    expenses: [
      {
        expenseDate: new Date('2022-03-10'),
        totalAmount: 100,
        expenses: [
          {
            id: 6,
            details: 'Mangoes',
            amount: 100,
            categoryId: 1,
            categoryName: 'Fruits',
          },
        ],
      },
      {
        expenseDate: new Date('2022-03-07'),
        totalAmount: 500,
        expenses: [
          {
            id: 11,
            details: 'Badam',
            amount: 500,
            categoryId: 1,
            categoryName: 'Fruits',
          },
        ],
      },
      {
        expenseDate: new Date('2022-03-02'),
        totalAmount: 100,
        expenses: [
          {
            id: 10,
            details: 'Bataka',
            amount: 100,
            categoryId: 1,
            categoryName: 'Fruits',
          },
        ],
      },
    ],
  };

  beforeEach(async () => {
    const expenseSpy = jasmine.createSpyObj(ExpenseService, ['getExpenses']);

    await TestBed.configureTestingModule({
      imports: [MatExpansionModule, MatListModule, NoopAnimationsModule, CategoryIconModule],
      declarations: [ExpensesComponent, DayRecordComponent, ExpenseRecordComponent],
      providers: [
        {
          provide: ExpenseService,
          useValue: expenseSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    expenseServiceSpy = TestBed.inject(ExpenseService) as jasmine.SpyObj<ExpenseService>;
    component = fixture.componentInstance;
    expenseServiceSpy.getExpenses.and.returnValue(of(testData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
