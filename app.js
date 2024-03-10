import express from "express";
import cors from 'cors'
import db from "./database/db.js"
import cursosRoutes from './routes/routes.js'
import usersRoutes from './routes/users.js'
// import filterUserType from './middlewares/authMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())

// Middleware para filtrar usuarios con roles específicos
// app.use('/admin', filterUserType(['Administrador']), adminRoutes);

app.use('/cursos', cursosRoutes)
app.use('/usuarios', usersRoutes)

try {
    await db.authenticate()
    console.log ('Conexion exitosa a la DB')
} catch (error){
    console.log(`El error de conexión es: ${error}`)
}

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})
