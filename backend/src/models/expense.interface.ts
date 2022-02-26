export interface IBaseExpense {
  amount: number;
  details?: string;
  categoryId: number;
  categoryName?: string;
  userId: number;
  expenseDate: Date;
}

export interface IExpense extends IBaseExpense {
  id: number;
}
