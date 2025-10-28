//Package Importation
//System
import Mongoose from 'mongoose'
import Fs from 'fs'
//Local
import { dbConn } from '../../dbconn.js'
import { Validation } from '../helpers/fieldValidation.js'

//Initialization
//Local
const validation = new Validation()

//PRODUCT Table Columns
const ProductSchema = Mongoose.model ('Product', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    state: { type: Boolean, required: true, 
        default: true  },
    createdAt: { type: Date, default:Date.now }
})


//PRODUCT Table Class
export class ProductModel {
    constructor() {
        this.split = validation.splitValue()
    }

    // Function Select
    // Esta función devuelve todo el listado de productos activos
    async sel(callback) {
        try {
            let valProduct = await ProductSchema.find({
                state: 1
            });

            callback( valProduct )
        }
        catch (error) {
            callback(`Ocurrió un problema en el sistema: ${error}`);
        }
    }


    // Function Add
    // Esta función realiza validaciones sobre los datos proporcionados antes de crear un nuevo producto en la base de datos.
    // Valida: nombre, descripción y precio. Si todo es válido, procede a guardar el producto.
        async add(varName, varDescription, varPrice, varImage, callback) {
            const split = this.split; // Separador para formatear mensajes de error o resultados.

            try {
                var error = 0; // Variable para almacenar el último error encontrado durante las validaciones.
    
                // Validar imagen
                // Comprueba que sea una imagen y no esté vacío el campo.
                await validation.image(varImage, function (err) {
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
                
                console.log(varName)
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
                            console.log('Imagen guardada exitosamente');
                        }
                    });
    
                    // 2. Insertar en la Colección Producto
                    const addProduct = new ProductSchema({
                        name: varName,
                        price: varPrice,
                        description: varDescription,
                        image: './' + savePath2
                    });
    
                    await addProduct.save();
    
                    callback(`1${split}Producto insertado correctamente...${split}/${split}2000`);
                } else {
                    // Si hubo errores durante las validaciones, devolver el último error encontrado
                    callback(error);
                }
            } catch (error) {
                // Manejar cualquier error inesperado durante la consulta.
                callback(`Se ha presentado un error debido a ${error.message}. Por favor inténtelo más tarde`);
            }
        }
}