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

export interface IExpenseCategorySummary {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
}

export interface IExpenseSummary {
  totalAmount: number;
  categories: IExpenseCategorySummary[];
}

export interface IExpenses {
  summary: IExpenseSummary;
  expenses: IDayExpenseRecord[]
}
