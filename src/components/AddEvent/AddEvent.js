import { useState, useRef } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScrollSelect from "../ScrollSelect/ScrollSelect";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const [title, setTitle] = useState();
  let shiftDate;
  const shiftSelect = useRef();

  console.log(value.toISOString().split("T")[0]);
  // console.log(shiftSelect.current.value);

  const addNewEvent = () => {
    let title,
      startDateTime,
      endDateTime,
      colorId = 0;

    switch (shiftSelect.current.value) {
      case "0":
        title = "CHU Voiron Matin";
        startDateTime = value.toISOString().split("T")[0];
        endDateTime = `${value.toISOString().split("T")[0]}T13:30:00`;
        console.log(startDateTime.toString());
        break;

      case "1":
        title = "CHU Voiron Aprem";
        colorId = 3;
        startDateTime = value.getHours();
        endDateTime = new Date(value).setHours(21);
        console.log(startDateTime);
        break;
    }

    var newEvent = {
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
    console.log(newEvent);

    const initiate = () => {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: process.env.REACT_APP_SCOPES,
        })
        .then(() => {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_MATT}/events`,
            method: "POST",
            body: newEvent,
          });
        })
        .then(
          (response) => {
            console.log(response);
            return [true, response];
          },
          function (err) {
            console.log(err);
            return [false, err];
          }
        );
    };
    gapi.load("client", initiate);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <ScrollSelect
        name="shift"
        label="Selectionné un shift "
        values={["SHift-Matin", "shift-soir"]}
        ref={shiftSelect}
      />
      <button onClick={addNewEvent}>Envoyer</button>
    </div>
  );
};

export default AddEvent;
