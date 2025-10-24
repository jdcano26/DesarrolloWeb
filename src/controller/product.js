//Package Importation
//System
import { Router } from 'express'
//Local
import { ProductModel } from '../../private/model/Product.js'


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
/*
productModel.post('/addProduct', upload.none(), (req, res) => {
    productModel.add(
        req.body.signUpFormEmail, 
        req.body.signUpFormUserName, 
        req.body.signUpFormPassword,
        req.body.signUpFormPassword2,
        req.body.signUpFormAgree,
        async function( result, userName ) {
            productData = {
                userName: userName,
                userTheme: 0,
                userProfile: "",
                userBackground: "",
                userPermission: null
            }

            if( userName != null) {
                res.cookie("productData", productData)
            }

            res.end( result )
        }
    )
})*/
