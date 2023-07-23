import express from 'express'
import { login, signUpUser } from '../controllers/userController'

export const usersRouter = express.Router()

usersRouter.post('/signup', signUpUser)
usersRouter.post('/login', login)