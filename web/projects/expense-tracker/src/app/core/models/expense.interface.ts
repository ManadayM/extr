export interface IBaseExpense {
  amount: number;
  name: string;
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
