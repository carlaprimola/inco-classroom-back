import CalendarModel from "../models/CalendarModel.js";
import CoursesModel from "../models/CoursesModel.js"

// Sincronizar el modelo con la base de datos
CalendarModel.sync()
  .then(() => {
    console.log('Modelo de calendario sincronizado correctamente con la base de datos');
    // Ahora puedes realizar tus consultas a la base de datos
    // Por ejemplo, aquí podrías llamar a tu función getCalendarEvents()
  })
  .catch(error => {
    console.error('Error al sincronizar el modelo de calendario con la base de datos:', error);
  });

// Method to obtain the calendar events
export const getCalendarEvents = async (req, res) => {
    try {
        const events = await CalendarModel.findAll({
            include: {
                model: CoursesModel,
                attributes: ['CourseID'],
              }
        });
        
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving calendar events", error });
    }
}

// Method to create a new event in the calendar
export const createCalendarEvent = async (req, res) => {
    const { CourseID, Date, ActivityDescription } = req.body;
    try {
        const newEvent = await CalendarModel.create({
            CourseID,
            Date,
            ActivityDescription
        });
        res.status(201).json({ message: "Calendar event created successfully", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating calendar event", error });
    }
}


