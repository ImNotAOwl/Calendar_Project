const newCalendarEvent = ( shiftSelectValue, dateEvent ) => {
  let title,
    startDateTime,
    endDateTime,
    colorId = 0;

  switch (shiftSelectValue) {
    case "0":
      title = "CHU Voiron Matin";
      startDateTime = dateEvent.toISOString().split("T")[0];
      endDateTime = `${dateEvent.toISOString().split("T")[0]}T13:30:00`;
      console.log(startDateTime.toString());
      break;

    case "1":
      title = "CHU Voiron Aprem";
      colorId = 3;
      startDateTime = dateEvent.getHours();
      endDateTime = new Date(dateEvent).setHours(21);
      console.log(startDateTime);
      break;
  }

  let jsonEvent = {
    summary: title,
    colorId: colorId,
    location: "",
    start: {
      dateTime: new Date(`${startDateTime}T09:00:00`),
      timeZone: "Europe/Paris",
    },
    end: {
      dateTime: new Date(`${startDateTime}T17:00:00`),
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
