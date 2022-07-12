import { useState, useRef } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScrollSelect from "../ScrollSelect/ScrollSelect";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  let [rangeDate, setRangeDate] = useState();
  const shiftSelect = useRef();

  rangeDate = value;
  console.log(value.toLocaleString());
  // console.log(shiftSelect.current.value);

  const addNewEvent = () => {
    let summary, startDateTime, endDateTime;

    switch (shiftSelect.current.value) {
      case 1:
        summary = "CHU Voiron Matin";
        startDateTime = value.toLocaleString();
        endDateTime = value.toLocaleString();
        break;

      default:
        break;
    }

    var newEvent = {
      summary: "Hello World",
      location: "",
      start: {
        dateTime: "2022-08-28T09:00:00-07:00",
        timeZone: "Europe/France",
      },
      end: {
        dateTime: "2022-08-28T17:00:00-07:00",
        timeZone: "Europe/France",
      },
      recurrence: [],
      attendees: [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const initiate = () => {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
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
