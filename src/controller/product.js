//Package Importation
//System
import { Router } from 'express'
import Multer from 'multer'
//Local
import { ProductModel } from '../../private/model/Product.js'


//Initialization
const upload = Multer();

//Server
export const productRoute = Router()
//Local
const productModel = new ProductModel()
/*
var productData = {
    userName: null,
    userTheme: null,
    userProfile: null,
    userBackground: null
}
*/


//Routes
productRoute.get('/product', async (req, res) => {
    productModel.sel(function(all){
      res.render(process.cwd() + '/src/views/product.ejs', { productData: all })
    })
})
productRoute.post('/formAddProduct', upload.single('addProductImage'), (req, res) => {
    productModel.add(
        req.body.addProductName,
        req.body.addProductDescription,
        req.body.addProductPrice,
        req.file ? req.file.buffer : null,
        async function( result ) {
            
            res.end( result )
        }
    )
})