import { useState } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  let [ rangeDate, setRangeDate ] = useState();

  rangeDate = value;
  console.log(rangeDate);

  const addNewEvent = () => {
    var newEvent = {
      summary: "Hello World",
      location: "",
      start: {
        dateTime: "2022-08-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2022-08-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: [],
      attendees: [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
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
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
      />
      <button onClick={addNewEvent}>Envoyer</button>
    </div>
  );
};

export default AddEvent;
