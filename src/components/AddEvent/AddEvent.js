import { useState, useRef } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newEvent";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const shiftSelect = useRef();
  const [submitMessage, setSubmitMessage] = useState("");

  console.log(value.toISOString().split("T")[0]);
  // console.log(shiftSelect.current.value);
  
  const addNewEvent = (shiftSelectValue, dateEvent) => {
    
    const newEvent = newCalendarEvent(shiftSelectValue, dateEvent);
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
            if (response.status === 200) {
              setSubmitMessage("L'évènement a bien été ajouté au calendrier");
              setTimeout(() => {
                setSubmitMessage("");
              }, 2000);
            }
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
      <input type="submit" onClick={() => addNewEvent(shiftSelect.current?.value, value)} value="Envoyer" />
      <p>{submitMessage}</p>
    </div>
  );
};

export default AddEvent;
