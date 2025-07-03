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
        console.log(colors.green.bold('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'))
    }
}

connectDB()

// Instancia de express
const server = express()

// Lista de orígenes permitidos
const whitelist = [
    process.env.FRONTEND_URL,
    'https://crud-frontend-fullstack.vercel.app',
    'http://localhost:5173'
];

// Middleware CORS robusto
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        console.log('🌐 Origin recibido:', origin)
        console.log('✅ Whitelist:', whitelist)

        if (!origin || whitelist.includes(origin)) {
            console.log(colors.green.bold('Petición permitida'))
            callback(null, true)
        } else {
            console.log(colors.red.bold('Petición no permitida desde:'), origin)
            callback(new Error('No permitido'))
        }
    },
    credentials: true,
};

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

// Middleware para ver las peticiones en consola
server.use(morgan('dev'))

// Rutas
server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' })
})

export default server
