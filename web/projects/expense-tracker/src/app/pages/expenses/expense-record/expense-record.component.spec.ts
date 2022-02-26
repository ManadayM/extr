import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { IExpense } from '@extr/core';
import { CategoryIconModule } from '../../../shared/components';

import { ExpenseRecordComponent } from './expense-record.component';

describe('ExpenseRecordComponent', () => {
  let component: ExpenseRecordComponent;
  let fixture: ComponentFixture<ExpenseRecordComponent>;

  const today = new Date();
  const testData: IExpense = {
      categoryId: 1,
      categoryName: 'fruits',
      amount: 70,
      id: 1,
      details: 'Mangos',
      expenseDate: today

  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, CategoryIconModule],
      declarations: [ ExpenseRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRecordComponent);
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
