import express from "express";
import { getCalendarEvents, createCalendarEvent } from "../controllers/CalendarController.js";

const routes = express.Router();

routes.get('/', getCalendarEvents);
routes.post('/', createCalendarEvent); // Route to create a new event in the calendar

export default routes;

