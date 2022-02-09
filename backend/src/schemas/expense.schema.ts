import Joi from "joi";

export const addExpenseSchema = Joi.object({
  amount: Joi.number().greater(0).positive().required(),
  categoryId: Joi.number().integer().greater(0).positive().required(),
  expenseDate: Joi.date().iso()
});
