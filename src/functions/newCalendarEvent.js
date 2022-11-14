import moment from "moment";
import { attendeeMail } from "../config/configuration.env";

// color GAPI: 
// 0 -> bleu paon
// 1 -> lavande (violet clair)
// 2 -> vert
// 3 -> violet
// 4 -> rose clair
// 5 -> jaune
// 6 -> mandarine (orange)
// 7 -> bleu paon
// 8 -> anthracite (gris)
// 9 -> myrtille (bleu foncé)
// 10 -> vert basilic (vert foncé)
// 11 -> rouge tomate


const newCalendarEvent = (
  shiftSelectValue,
  dateEvent,
  description,
  title,
  startTime,
  endTime,
  colorNewEvent
) => {
  let startDateTime,
    endDateTime,
    colorId = 0;

  switch (shiftSelectValue) {
    case "1":
      title = "CHU Matin 6h30-14h";
      colorId = 4;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T06:30:00`;
      endDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T14:00:00`;
      console.log(startDateTime);
      break;
    case "2":
      title = "CHU Aprem 13h30-21h";
      colorId = 4;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T13:30:00`;
      endDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T21:00:00`;
      console.log(startDateTime);
      break;
    case "3":
      title = "CHU Nuit 20h45-7h";
      colorId = 4;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T20:45:00`;
      endDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T23:59:00`;
      console.log(startDateTime);
      break;
    case "4":
      title = "Perisco ETE 8h-18h";
      colorId = 3;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T08:00:00`;
      endDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T18:00:00`;
      console.log(startDateTime);
      break;
    case "5":
      title = "Ooolala 9h-17h";
      colorId = 0;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T09:00:00`;
      endDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T17:00:00`;
      console.log(startDateTime);
      break;
    case "6":
      title = "CESI 9h-17h";
      colorId = 6;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T09:00:00`;
      endDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T17:00:00`;
      console.log(startDateTime);
      break;
    default : 
      colorId = colorNewEvent;
      startDateTime = `${moment(dateEvent).format("yyyy-MM-DD")}T${startTime}:00`; 
      endDateTime =  `${moment(dateEvent).format("yyyy-MM-DD")}T${endTime}:00`;
      break;
  }

  let jsonEvent = {
    summary: title,
    colorId: colorId,
    location: "",
    description: description,
    start: {
      dateTime: startDateTime,
      timeZone: "Europe/Paris",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "Europe/Paris",
    },
    recurrence: [],
    attendees: [
      {
        email: attendeeMail,
      },
    ],
    reminders: {
      useDefault: true,
    },
    visibility: "private"
  };

  return jsonEvent;
};

export default newCalendarEvent;
