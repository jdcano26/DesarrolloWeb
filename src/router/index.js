//Package Importation
//System
import express from 'express'
//Local
import { homeRoute } from '../controller/home.js'
//import { loginRoute } from '../controller/login.js'
//import { signUpRoute } from '../controller/signup.js'
import { productRoute } from '../controller/product.js'

//Send Routes for Index
export const routes = express.Router()

//Routes
routes.use(homeRoute)
//routes.use(loginRoute)
//routes.use(signUpRoute)
routes.use(productRoute)