import { useState, useRef } from "react";
import { useEvents } from "../../contexts/eventsContext";
import moment from "moment";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newCalendarEvent";
import gapi_initiate from "../../functions/gapi_initiate";
import CustomButton from "../CustomButton/CustomButton";


const EventForm = (props) => {
  const descriptionMessage = useRef();
  const [selectValue, setSelectValue] = useState("0");
  const shiftSelect = useRef();
  const { setSubmitMessage, getEvents } = useEvents();

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

  return props.name === "new" ? (
    <>
      <input
        type="text"
        name="title"
        placeholder="Event title"
        // ref={descriptionMessage}
        className="event description"
      />
      <label htmlFor="startTime">Start Time</label>
      <input type="time" name="startTime" />
      <label htmlFor="endTime">End Time</label>
      <input type="time" name="endTime" />
      <CustomButton
        suffixClass={"_yellow event submit"}
        innerText={"Envoyer"}
        handleClick={() =>
          addNewEvent(
            shiftSelect.current?.value,
            props.dateValue,
            descriptionMessage.current?.value
          )
        }
      />
    </>
  ) : (
    <>
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
            props.dateValue,
            descriptionMessage.current?.value
          )
        }
      />
    </>
  );
};

export default EventForm;
