
import express from "express";  
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import router from "./router";
import db from "./config/db";
import morgan from "morgan";

// Conectar a Base de Datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.green.bold('Conexión exitosa a la BD'))
    } catch (error) {
       // console.log(error)
        console.log( colors.bgRed.white('Hubo un error al conectar a la BD'))
    }
}

connectDB()

// Instancia de express
const server = express()

// Permitir conexiones desde el frontend
const corsOptions: CorsOptions = {

    // oigin: es el origen de la petición. Quien me envía la petición
    // callback: es la función que se ejecuta cuando se recibe la petición    
    origin: function(origin, callback) {
        console.log(origin)
        console.log('FRONTEND_URL:', process.env.FRONTEND_URL)

        if(origin === process.env.FRONTEND_URL) {
            console.log(colors.green.bold('Petición permitida'))
            callback(null, true)
        } else {
            console.log(colors.red.bold('Petición no permitida'))
            callback(new Error('No permitido'))
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

// Middleware para ver las peticiones en la consola. Podemos elegir 'dev' o 'combined' u otras opcciones.
server.use(morgan('dev'))

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})


export default server