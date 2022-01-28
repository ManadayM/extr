export interface BaseExpense {
  amount: number;
  categoryId: number;
  userId: number;
  expenseDate: Date;
};

export interface Expense extends BaseExpense {
  id: number;
}
