//Package Importation
//System
import Mongoose from 'mongoose'
//Local
import { dbConn } from '../../dbconn.js'


//PRODUCT Table Columns
const ProductSchema = Mongoose.model ('Product', {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: Boolean, required: true, 
        default: true  },
    createdAt: { type: Date, default:Date.now }
})


//PRODUCT Table Class
export class ProductModel {
    
    // Function Select
    // Esta función devuelve todo el listado de productos
    async sel(callback) {
        try {
            let valProduct = await ProductSchema.find({
                state: 1
            });

            callback( valProduct );
            console.log(valProduct)
        }
        catch (error) {
            callback(`Ocurrió un problema en el sistema: ${error}`);
        }
        //}
    }
}