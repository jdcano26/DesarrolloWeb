//Package Importation
//System
import { Router } from 'express'
//Local
import { ProductModel } from '../../private/model/Product.js'


//Server
export const homeRoute = Router()
//Local
const productModel = new ProductModel()


//Routes
homeRoute.get('/', async (req, res) => {
    productModel.sel(function(all){
      res.render(process.cwd() + '/src/views/home.ejs', { productData: all })
    })
})