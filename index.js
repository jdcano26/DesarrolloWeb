import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

import { routes } from './src/router/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")))

// Configuración de vistas
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src", "views"))
// Archivos
app.use('/css', express.static(process.cwd() + '/public/css'))
app.use('/js', express.static(process.cwd() + '/public/js'))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use("/", routes)
app.use("/login", routes)
app.use("/signup", routes)
app.use("/product", routes)


// Inicialización Puerto
const PORT = 8000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
