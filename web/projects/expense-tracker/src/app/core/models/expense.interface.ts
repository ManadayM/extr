export interface IBaseExpense {
  amount: number;
  details?: string;
  categoryId: number;
  categoryName: string;
  expenseDate?: Date;
}

export interface IExpense extends IBaseExpense {
  id: number;
}

export interface IDayExpenseRecord {
  expenseDate: Date;
  totalAmount: number;
  expenses: IExpense[]
}
