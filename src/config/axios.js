import axios from "axios";
import { calendar, calendarApiKey } from "./configuration.env";

const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar}/events`;

const instance = axios.create({
  baseURL: baseUrl,
  params: {
    key: calendarApiKey,
  },
});

export default instance;
