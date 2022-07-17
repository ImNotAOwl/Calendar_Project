import { useState, useRef } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newEvent";
import moment from "moment";

import "./AddEvent.css";
import "react-calendar/dist/Calendar.css";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const [submitMessage, setSubmitMessage] = useState("");
  const shiftSelect = useRef();
  const descriptionMessage = useRef();

  console.log(moment(value[0]).add(1, "days"));
  // console.log(shiftSelect.current.value);

  // moment(value[0]).startOf('day')

  const addNewEvent = (shiftSelectValue, dateEvent, description) => {

    let newEvent;
    let currDate = moment(dateEvent[0]).startOf("day");
    let lastDate = moment(dateEvent[1]).startOf("day");

    do {
      newEvent = newCalendarEvent(shiftSelectValue, currDate.toDate(), description);
      console.log(newEvent);

      const initiate = (newEvent) => {
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
              if (response.status === 200) {
                setSubmitMessage("L'évènement a bien été ajouté au calendrier");
                setTimeout(() => {
                  setSubmitMessage("");
                }, 4000);
              }
              return [true, response];
            },
            function (err) {
              console.log(err);
              return [false, err];
            }
          );
      };
      gapi.load("client", initiate(newEvent));

      currDate.add(1, "days");
    } while (currDate.diff(lastDate) <= 0);

    descriptionMessage.current.value = "";
  };

  return (
    <div className="add_event">
      <Calendar onChange={onChange} value={value} selectRange={true} className="calendar_event"/>
      <div className="select_event">
        <ScrollSelect
          name="shift"
          label="Selectionnez un shift "
          values={["Voiron-Matin", "Voiron-Aprem", "Voiron-nuit", "Périsco-été"]}
          ref={shiftSelect}
        />
        <input type="text" name="description" placeholder="Event description" ref={descriptionMessage} className="event description"/>
        <input
          type="submit"
          onClick={() => addNewEvent(shiftSelect.current?.value, value, descriptionMessage.current?.value)}
          value="Envoyer"
          className="event submit"
        />
        <p style={{textDecoration: "underline", fontWeight: "bold"}} >{submitMessage}</p>
      </div>
    </div>
  );
};

export default AddEvent;
