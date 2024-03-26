import CalendarModel from "../models/CalendarModel.js";
import CoursesModel from "../models/CoursesModel.js"
import moment from "moment-timezone"; 

  // Mostrar todos los eventos
  export const getCalendarEvents = async (req, res) => {
    try {
        const events = await CalendarModel.findAll({
            include: CoursesModel
        });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving calendar events", error });
    }
}

// Crear nuevo evento
export const createCalendarEvent = async (req, res) => {
    const { CursoID, Fecha, DescripcionActividad, Direccion } = req.body;
    try {
        // Ajusta la fecha y hora a la zona horaria del servidor
        const fechaServidor = moment.tz(Fecha, 'UTC').toDate(); 
         


        const newEvent = await CalendarModel.create({
            CursoID,
            Fecha: fechaServidor,
            DescripcionActividad,
            Direccion,
            
        });
        res.status(201).json({ message: "Nuevo evento creado correctamente", event: newEvent });
    } catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ message: "Error al crear el evento", error });
    }
}

// Eliminar un evento
export const deleteEvent = async (req,res) => {
    const {id} = req.params;
    try{
        const resultado = await CalendarModel.destroy({
            where:{id}});
        if (!resultado) {
            return res.status(404).json({message: "Evento no encontrado"});
        }
        res.status(200).json({message:"Evento eliminado correctamente"});    
    } catch (error){
        console.log("Error al eliminar el evento:",error)
        res.status(500).json({message: "Error al eliminar el evento", error});

    }
    
}
