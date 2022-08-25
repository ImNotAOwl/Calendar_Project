import { useState, useRef } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newEvent";
import gapi_initiate from "../../functions/gapi_initiate";
import { useEvents } from "../../contexts/eventsContext";

import "./AddEvent.css";
import "react-calendar/dist/Calendar.css";
import CustomButton from "../CustomButton/CustomButton";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const [selectValue, setSelectValue] = useState("0");
  const shiftSelect = useRef();
  const descriptionMessage = useRef();
  const { submitMessage, setSubmitMessage, getEvents } = useEvents();

  console.log(moment(value[0]).add(1, "days"));
  // console.log(shiftSelect.current.value);

  // moment(value[0]).startOf('day')

  const addNewEvent = (shiftSelectValue, dateEvent, description) => {
    let newEvent;
    let currDate = moment(dateEvent[0]).startOf("day");
    let lastDate = moment(dateEvent[1]).startOf("day");

    do {
      newEvent = newCalendarEvent(
        shiftSelectValue,
        currDate.toDate(),
        description
      );
      console.log(newEvent);
      gapi_initiate("POST", newEvent, null, setSubmitMessage);

      currDate.add(1, "days");
    } while (currDate.diff(lastDate) <= 0);

    setSubmitMessage("L'évènement a bien été ajouté au calendrier");
    setTimeout(() => {
      setSubmitMessage("");
      getEvents();
    }, 4000);

    descriptionMessage.current.value = "";
  };

  return (
    <div className="add_event">
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
        className="calendar_event"
      />
      <div className="select_event">
        <ScrollSelect
          name="shift"
          label="Selectionnez un shift "
          values={[
            "Voiron-Matin",
            "Voiron-Aprem",
            "Voiron-nuit",
            "Périsco-été",
            "Ooolala 9h-17h",
            "CESI 9h-17h",
          ]}
          ref={shiftSelect}
          setSelectValue={setSelectValue}
        />

        {/* TODO: make a component with title, startTime, endTime, color */}
        {selectValue === "0" ? (
          <input
            type="text"
            name="description"
            placeholder="Event title"
            ref={descriptionMessage}
            className="event description"
          />
        ) : null}

        <input
          type="text"
          name="description"
          placeholder="Event description"
          ref={descriptionMessage}
          className="event description"
        />
        <CustomButton
          suffixClass={"_yellow event submit"}
          innerText={"Envoyer"}
          handleClick={() =>
            addNewEvent(
              shiftSelect.current?.value,
              value,
              descriptionMessage.current?.value
            )
          }
        />
        <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
          {submitMessage}
        </p>
      </div>
    </div>
  );
};

export default AddEvent;
