//Package Importation
//System
import Mongoose from "mongoose";


//Send Connection
export const{ dbConn } = Mongoose.connect('mongodb://localhost/DesarrolloWeb', )
.catch(error => console.error(error))