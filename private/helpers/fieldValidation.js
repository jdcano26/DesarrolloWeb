//Package Importation
//System
import Express from "express"
import Validator from "validator"
import Crypto from "crypto"
import { fileTypeFromBuffer } from 'file-type';


//FIELD Validation Class
export class Validation {
    constructor() {
        this.split = "</&split&/>"
    }

    splitValue(){
        return `${this.split}`
    }

    root(){
        const root = './public/'

        return root.length
    }

    route(varFolder){
        const root = './public/img/'

        switch (varFolder) {
            case "product":
                return root + 'user/product/'
            default:
                break
        }
    }

    //Email Validation
    token(varCant){
        const token = Crypto.randomBytes(varCant).toString('hex')
        const date = new Date()

        // Extraer los componentes individuales de la fecha
        const anio = date.getUTCFullYear();
        const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() devuelve de 0 a 11, así que sumamos 1
        const dia = String(date.getUTCDate()).padStart(2, '0');
        const hora = String(date.getUTCHours()).padStart(2, '0');
        const minutos = String(date.getUTCMinutes()).padStart(2, '0');
        const segundos = String(date.getUTCSeconds()).padStart(2, '0');
        
        const result = anio + mes + dia + hora + minutos + segundos + token

        return result
    }

    //Extesión
    ext(){
        return '.jpg'
    }

    //UserName Validation
    name( varUser, callback ){
        const result = 
        Validator.isEmpty(varUser, { ignore_whitespace: false })
        ? `0${this.split}Digíte un Nombre de Usuario válido.${this.split}username`
        : !Validator.isAlphanumeric(varUser)
        ? `0${this.split}Digíte un Nombre de Usuario válido. Solo puede contener números y letras${this.split}username`
        : varUser.length > 20
        ? `0${this.split}El Nombre de Usuario no puede exceder los 20 carácteres${this.split}username`
        : null

        callback(result)
    }

    //Text
    text( varText, varCount, varFieldName, varFieldNameForm, callback ){
        const result = 
        Validator.isEmpty(varText, { ignore_whitespace: false })
        ? `0${this.split}El campo ${varFieldName} no es válido.${this.split}${varFieldNameForm}`
        : varText.length > varCount
        ? `0${this.split}El campo ${varFieldName} no puede exceder los ${varCount} carácteres${this.split}${varFieldNameForm}`
        : null

        callback(result)
    }

    //Date
    async image(varImage, callback) {
        // Lista de extensiones permitidas
        const allowedExtensions = ['png', 'jpg', 'jpeg'];

        // Obtiene el tipo de archivo desde el buffer
        const fileDetails = varImage != null ? await fileTypeFromBuffer(varImage) : null;


        const result = 
        varImage == null
        ? `0${this.split}Debe cargar un archivo.${this.split}imagen`
        : !allowedExtensions.includes(fileDetails != null ? fileDetails.ext : null)
        ? `0${this.split}El archivo cargado no es válido.${this.split}imagen`
        : null

        callback(result)
    }
}