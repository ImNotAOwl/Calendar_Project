import { useState, useRef } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newCalendarEvent";
import gapi_initiate from "../../functions/gapi_initiate";
import { useEvents } from "../../contexts/eventsContext";
import CustomButton from "../CustomButton/CustomButton";

import "./AddEvent.css";
import "react-calendar/dist/Calendar.css";
import EventForm from "../EventForm/EventForm";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const [selectValue, setSelectValue] = useState("0");
  const [tabs, setTabs] = useState(0);
  const shiftSelect = useRef();
  const descriptionMessage = useRef();
  const [tabShift, setTabShift] = useState();
  const [tabNew, setTabNew] = useState();
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
        <div className="tabs">
          <h3 className={tabs === 0 ? "active" : ""} onClick={() => setTabs(0)}>
            Shift Event
          </h3>
          <h3 className={tabs === 1 ? "active" : ""} onClick={() => setTabs(1)}>
            New Event
          </h3>
        </div>
        <div className="tab">
          {tabs === 0 ? (
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
                    value,
                    descriptionMessage.current?.value
                  )
                }
              />
              <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
                {submitMessage}
              </p>
            </>
          ) : (
            <EventForm />
          )}
        </div>

        {/* TODO: make a component with title, startTime, endTime, color */}
        {/* {selectValue === "0" ? (
          <EventForm/>
        ) : null} */}
      </div>
    </div>
  );
};

export default AddEvent;
