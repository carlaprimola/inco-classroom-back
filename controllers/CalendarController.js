import CalendarModel from "../models/CalendarModel.js";
import CoursesModel from "../models/CoursesModel.js"


  // Mostrar todos los eventos
  export const getCalendarEvents = async (req, res) => {
    try {
        const events = await CalendarModel.findAll({
            include: CoursesModel // incluye los datos del curso relacionado
        });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving calendar events", error });
    }
}

// Method to create a new event in the calendar
export const createCalendarEvent = async (req, res) => {
    const { CursoID, Fecha, DescripcionActividad, Direccion, Hora } = req.body;
    try {
        const newEvent = await CalendarModel.create({
            CursoID,
            Fecha,
            DescripcionActividad,
            Direccion,
            Hora
        });
        res.status(201).json({ message: "Nuevo evento creado correctamente", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el evento", error });
    }
}


