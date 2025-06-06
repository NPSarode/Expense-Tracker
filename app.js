import express from 'express'
import { ExpenseCategoryRoutes } from './Routes/ExpenseCategory.js'
import { config } from 'dotenv'
import { UsersRoutes } from './Routes/Users.js'
import { ExpenseRoutes } from './Routes/Expenses.js'
import cors from 'cors'


export const app = express()

config({
    path: "./.env"
})

app.use(express.json())
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.FRONTEND_URI,
    credentials: true
}))
app.use(ExpenseCategoryRoutes)
app.use(ExpenseRoutes)
app.use(UsersRoutes)
