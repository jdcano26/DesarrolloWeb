//Package Importation
//System
import { Router } from 'express'
import Multer from 'multer'
import Fs from 'fs'
//Local
import { ProductModel } from '../../private/model/Product.js'
import { Validation } from '../../private/helpers/fieldValidation.js'


//Initialization
const upload = Multer();
//Local
const validation = new Validation()

//Server
export const productRoute = Router()
//Local
const productModel = new ProductModel()


//Routes
productRoute.get('/product', async (req, res) => {
    productModel.sel(function(all){
      res.render(process.cwd() + '/src/views/product.ejs', { productData: all })
    })
})
productRoute.post('/formAddProduct', upload.single('addProductImage'), (req, res) => {
    const split = validation.splitValue()

    try {
        var error = 0; // Variable para almacenar el último error encontrado durante las validaciones.
        var varName = req.body.addProductName
        var varPrice = req.body.addProductPrice
        var varDescription = req.body.addProductDescription
        var varImage = req.file ? req.file.buffer : null

        // Validar imagen
        // Comprueba que sea una imagen y no esté vacío el campo.
        validation.image(varImage, function (err) {
            if (err != null) {
                error = err; // Si hay un error, se almacena.
            }
        });
    
        // Validar especificaciones
        // Verifica que el campo especificaciones cumpla con cantidad de carácteres.
        validation.text(varDescription, 1000, "Especificaciones", "addSerieFormDescription", function (err) {
            if (err != null) {
                error = err; // Si hay un error, se almacena.
            }
        });
    
        // Validar precio
        // Verifica que el campo precio cumpla con cantidad de carácteres.
        validation.text(varPrice, 1000, "Precio", "addProductPrice", function (err) {
            if (err != null) {
                error = err; // Si hay un error, se almacena.
            }
        });
        
        // Validar nombre 
        // Comprueba que el nombre de usuario cumpla con las reglas establecidas (por ejemplo, formato y longitud).
        validation.text(varName, 244, "Nombre del Celular", "addProductName", function (err) {
            if (err != null) {
                error = err; // Si hay un error, se almacena.
            }
        });
    
        console.log(error)

        // Si no hay errores en ninguna validación, procedemos a crear el usuario
        if (error == 0) {
        
            const root = validation.root()
            const route = validation.route("product")
            const token = validation.token(10)
            const ext = validation.ext()
        
        
            const savePath = route + token + ext;
            const savePath2 = savePath.substring(root)
        
            // Guardar el buffer en la ruta específica
            Fs.writeFile(savePath, varImage, (err) => {
                if (err) {
                    console.error('Error al guardar la imagen:', err);
                } else {
                    productModel.add(
                        varName,
                        varDescription,
                        varPrice,
                        savePath2,
                        async function( result ) {
                            
                            res.end( result )
                        }
                    )
                }
            });
        
        } else {
            // Si hubo errores durante las validaciones, devolver el último error encontrado
            res.end(error);
        }
    } catch (error) {
        console.log(error)
        // Manejar cualquier error inesperado durante la consulta.
        res.end(`0${split}Se ha presentado un error debido a ${error.message}. Por favor inténtelo más tarde`);
    }
})