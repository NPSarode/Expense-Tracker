import express from 'express'
import { getExpenseCategories } from '../Controllers/ExpenseCategory.js'

export const ExpenseCategoryRoutes = express.Router() 

ExpenseCategoryRoutes.get("/categories", getExpenseCategories)