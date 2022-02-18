import { BaseExpense, Expense } from "../models";
import { dbUtils } from "../utils";
import db from "../db";

export const findAll = async (userId: number): Promise<Expense[]> => {
  const query = `
    SELECT amount, categories.name, TO_CHAR(expense_date, 'yyyy-mm-dd') as expense_date 
    FROM expenses
    JOIN categories ON categories.id = expenses.category_id
    WHERE user_id = $1;
  `;

  const { rows } = await db.query(query, [userId]);
  return dbUtils.toCamelCase(rows);
};

export const create = async (newExpense: BaseExpense): Promise<Expense> => {
  const { amount, categoryId, userId, expenseDate } = newExpense;
  const query = 'INSERT INTO expenses (amount, category_id, user_id, expense_date) VALUES ($1, $2, $3, $4) RETURNING *;';

  const { rows } = await db.query(query, [amount, categoryId, userId, expenseDate]);
  return dbUtils.toCamelCase(rows)[0];
};
