import moment from "moment";

const newCalendarEvent = (shiftSelectValue, dateEvent, description) => {

  let title,
    startDateTime,
    endDateTime,
    colorId = 0;

  switch (shiftSelectValue) {
    case "0":
      title = "CHU Matin 6h30-14h";
      colorId = 4;
      startDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T06:30:00`;
      endDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T14:00:00`;
      console.log(startDateTime);
      break;
    case "1":
      title = "CHU Aprem 13h30-21h";
      colorId = 4;
      startDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T13:30:00`;
      endDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T21:00:00`;
      console.log(startDateTime);
      break;
    case "2":
      title = "CHU Nuit 20h45-7h";
      colorId = 4;
      startDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T20:45:00`;
      endDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T23:59:00`;
      console.log(startDateTime);
      break;
    case "3":
      title = "Perisco ETE 8h-18h";
      colorId = 3;
      startDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T08:00:00`;
      endDateTime = `${moment(dateEvent).format('yyyy-MM-DD')}T18:00:00`;
      console.log(startDateTime);
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
    attendees: [],
    reminders: {
      useDefault: true,
    },
  };

  return jsonEvent;
};

export default newCalendarEvent;
