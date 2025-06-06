import express from 'express'
import { addExpenseByUserId, deleteExpenseById, getCategoryWiseExpense, getExpensesByMonth, getExpensesByUserId, getExpenseSummaryById } from '../Controllers/Expenses.js'

export const ExpenseRoutes = express.Router() 

ExpenseRoutes.get("/expenses", getExpensesByUserId)
ExpenseRoutes.post("/expense", addExpenseByUserId)
ExpenseRoutes.delete("/expense/:id", deleteExpenseById)
ExpenseRoutes.get("/summary/:id", getExpenseSummaryById)
ExpenseRoutes.get("/category_wise_expense/:id", getCategoryWiseExpense)
ExpenseRoutes.get("/expenses_by_month/:id", getExpensesByMonth)