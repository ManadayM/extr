import { IBaseExpense, IExpense } from '@models';
import { dbUtils } from '@utils';
import db from '@db';

export const findAll = async (userId: number): Promise<IExpense[]> => {
  const query = `
    SELECT expenses.id, details, amount, category_id, categories.name as category_name, TO_CHAR(expense_date, 'yyyy-mm-dd') as expense_date
    FROM expenses
    JOIN categories ON categories.id = expenses.category_id
    WHERE user_id = $1
    ORDER BY expense_date DESC;
  `;

  const { rows } = await db.query(query, [userId]);
  return dbUtils.toCamelCase(rows);
};


export const findOne = async (userId: number, expenseId: number): Promise<IExpense | null> => {
  const query = `
    SELECT expenses.id, details, amount, category_id, categories.name as category_name, TO_CHAR(expense_date, 'yyyy-mm-dd') as expense_date
    FROM expenses
    JOIN categories ON categories.id = expenses.category_id
    WHERE user_id = $1 AND expenses.id = $2;
  `;

  const { rows } = await db.query(query, [userId, expenseId]);

  if (rows.length) {
    return (dbUtils.toCamelCase(rows))[0];
  }
  return null;
};

export const create = async (newExpense: IBaseExpense): Promise<IExpense> => {
  const { amount, details, categoryId, userId, expenseDate } = newExpense;
  const query = 'INSERT INTO expenses (amount, details, category_id, user_id, expense_date) VALUES ($1, $2, $3, $4, $5) RETURNING *;';

  const { rows } = await db.query(query, [amount, details, categoryId, userId, expenseDate]);
  return dbUtils.toCamelCase(rows)[0];
};
