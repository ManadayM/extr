import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseService, IDayExpenseRecord } from '@extr/core';
import { of } from 'rxjs';
import { CategoryIconModule } from '../../shared/components';
import { DayRecordComponent } from './day-record/day-record.component';
import { ExpenseRecordComponent } from './expense-record/expense-record.component';

import { ExpensesComponent } from './expenses.component';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;
  let expenseServiceSpy: jasmine.SpyObj<ExpenseService>;

  const today = new Date();

  const testData: Array<IDayExpenseRecord> = [
    {
      expenseDate: today,
      expenses: [
        {
          categoryId: 1,
          categoryName: 'fruits',
          amount: 70,
          id: 1,
          details: 'Mangos',
          expenseDate: today,
        },
        {
          categoryId: 1,
          categoryName: 'fruits',
          amount: 30,
          id: 2,
          details: 'grapes',
          expenseDate: today,
        },
      ],
      totalAmount: 100,
    },
  ];

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
