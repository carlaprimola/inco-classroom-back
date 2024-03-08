import express from "express";
import cors from 'cors'
//importamos la conexion a la base de datos
import db from "./database/db.js"
//importamos el enrutador
import cursosRoutes from './routes/routes.js'
import usersRoutes from './routes/users.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/cursos', cursosRoutes)
app.use('/usuarios', usersRoutes)

// app.use('/uploads',express.static('uploads'));

try {
    await db.authenticate()
    console.log ('Conexion exitosa a la DB')
} catch (error){
    console.log(`El error de conexión es: ${error}`)
}

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})
