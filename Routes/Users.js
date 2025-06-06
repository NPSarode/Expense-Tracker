import express from 'express'
import { addUser, deleteUser, getUsers, updateUser } from '../Controllers/Users.js'

export const UsersRoutes = express.Router() 

UsersRoutes.get("/users", getUsers)
UsersRoutes.post("/user", addUser)
UsersRoutes.put("/user", updateUser)
UsersRoutes.delete("/user/:id", deleteUser)