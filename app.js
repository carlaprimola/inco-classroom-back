import express from "express";
import cors from 'cors'
import db from "./database/db.js"
//importamos el enrutador
import cursosRoutes from './routes/courses.js'
import usersRoutes from './routes/users.js'
import contentRoutes from './routes/content.js'
import studentRoutes from './routes/student.js'
import authRoutes from './routes/auth.js'
import calendarRoutes from './routes/calendar.js'
import academicRoutes from './routes/academic.js'
import "dotenv/config.js"

// require('dotenv').config();

const app = express()

app.use(cors({
    origin: 'http://localhost:3000' // Permitir solicitudes desde http://localhost:3000
}));

app.use(express.json())

// Middleware para filtrar usuarios con roles específicos
// app.use('/admin', filterUserType(['Administrador']), adminRoutes);

app.use('/cursos', cursosRoutes)
app.use('/contenido', contentRoutes)
app.use('/usuarios', usersRoutes)
app.use('/student', studentRoutes)
app.use('/login', authRoutes) 
app.use('/calendario', calendarRoutes)
app.use('/academic', academicRoutes)

try {
    await db.authenticate()
    console.log ('Conexion exitosa a la DB')
} catch (error){
    console.log(`El error de conexión es: ${error}`)
}

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})
