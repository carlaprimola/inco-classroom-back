import express from "express";
import { getCalendarEvents, createCalendarEvent, deleteEvent } from "../controllers/CalendarController.js";

const routes = express.Router();

routes.get('/', getCalendarEvents);
routes.post('/', createCalendarEvent); 
routes.delete('/:id', deleteEvent)

export default routes;


