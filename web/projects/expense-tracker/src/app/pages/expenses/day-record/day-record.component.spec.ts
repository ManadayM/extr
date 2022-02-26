import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IDayExpenseRecord } from '@extr/core';
import { CategoryIconModule } from '../../../shared/components';
import { ExpenseRecordComponent } from '../expense-record/expense-record.component';

import { DayRecordComponent } from './day-record.component';

describe('DayRecordComponent', () => {
  let component: DayRecordComponent;
  let fixture: ComponentFixture<DayRecordComponent>;
  const today = new Date();

  const testData: IDayExpenseRecord = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatExpansionModule, MatListModule, NoopAnimationsModule, CategoryIconModule],
      declarations: [DayRecordComponent, ExpenseRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayRecordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = testData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should throw an error if data is not provided', () => {
    expect(() => fixture.detectChanges()).toThrowError('Required input [data] not provided.');
  });
});
