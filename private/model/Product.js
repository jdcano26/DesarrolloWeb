//Package Importation
//System
import Mongoose from 'mongoose'
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
                
                // 2. Insertar en la Colección Producto
                const addProduct = new ProductSchema({
                    name: varName,
                    price: varPrice,
                    description: varDescription,
                    image: './' + varImage
                });
    
                await addProduct.save();
    
                callback(`1${split}Producto insertado correctamente...${split}/${split}2000`);

            } catch (error) {
                // Manejar cualquier error inesperado durante la consulta.
                callback(`Se ha presentado un error debido a ${error.message}. Por favor inténtelo más tarde`);
            }
        }
}