//Package Importation
//System
import { Router } from 'express'
import CookieParser from 'cookie-parser'

export const homeRoute = Router()

homeRoute.get("/", (req, res) => {
  res.render("home");
});

export default homeRoute;
