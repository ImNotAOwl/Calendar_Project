import { useState, useRef } from "react";
import { gapi } from "gapi-script";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newEvent";
import moment from "moment";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const shiftSelect = useRef();
  const [submitMessage, setSubmitMessage] = useState("");

  console.log(moment(value[0]).add(1, "days"));
  // console.log(shiftSelect.current.value);

  // moment(value[0]).startOf('day')

  const addNewEvent = (shiftSelectValue, dateEvent) => {

    let newEvent;
    let currDate = moment(dateEvent[0]).startOf("day");
    let lastDate = moment(dateEvent[1]).startOf("day");

    do {
      newEvent = newCalendarEvent(shiftSelectValue, currDate.toDate());

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
      gapi.load("client", initiate(newEvent));
      
      currDate.add(1, "days");
    } while (currDate.diff(lastDate) <= 0);

  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} selectRange={true} />
      <ScrollSelect
        name="shift"
        label="Selectionné un shift "
        values={["Voiron-Matin", "Voiron-Aprem", "Voiron-nuit", "Périsco-été"]}
        ref={shiftSelect}
      />
      <input
        type="submit"
        onClick={() => addNewEvent(shiftSelect.current?.value, value)}
        value="Envoyer"
      />
      <p>{submitMessage}</p>
    </div>
  );
};

export default AddEvent;
