import { useState, useRef } from "react";
import { useEvents } from "../../contexts/eventsContext";
import moment from "moment";
import ScrollSelect from "../ScrollSelect/ScrollSelect";
import newCalendarEvent from "../../functions/newCalendarEvent";
import CustomButton from "../CustomButton/CustomButton";
import axios from "../../config/axios";

import "./EventForm.css";

const EventForm = (props) => {
  const descriptionMessage = useRef();
  const shiftSelect = useRef();
  const titleMessage = useRef();
  const startTime = useRef();
  const endTime = useRef();
  const [selectValue, setSelectValue] = useState("0");
  const [selectedColor, setSelectedColor] = useState();
  const { setSubmitMessage, getEventsAxios, token } = useEvents();
  const colors = [
    { value: 0, color: "bleu", defaultColor: true },
    { value: 2, color: "vert" },
    { value: 6, color: "orange" },
    { value: 9, color: "myrtille" },
    { value: 10, color: "vert_fonce" },
  ];

  const addNewEvent = async (
    shiftSelectValue,
    dateEvent,
    description,
    newEventToAdd
  ) => {
    let newEvent;

    if (!newEventToAdd) {
      let currDate = moment(dateEvent[0]).startOf("day");
      let lastDate = moment(dateEvent[1]).startOf("day");
      do {
        newEvent = newCalendarEvent(
          shiftSelectValue,
          currDate.toDate(),
          description
        );
        console.log(newEvent);
        await axios.post("", newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        currDate.add(1, "days");
      } while (currDate.diff(lastDate) <= 0);
    } else {
      newEvent = newCalendarEvent(
        null,
        props.dateValue,
        descriptionMessage.current?.value,
        titleMessage.current?.value,
        startTime.current?.value,
        endTime.current?.value,
        selectedColor
      );
      console.log(newEvent);

      await axios.post("", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      titleMessage.current.value = "";
      startTime.current.value = "";
      endTime.current.value = "";
    }

    setSubmitMessage("L'évènement a bien été ajouté au calendrier");
    setTimeout(() => {
      setSubmitMessage("");
      getEventsAxios();
    }, 4000);

    descriptionMessage.current.value = "";
  };

  const handleChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return props.name === "new" ? (
    <>
      <input
        type="text"
        name="title"
        placeholder="Event title"
        ref={titleMessage}
        className="event description"
      />
      <input
        type="text"
        name="description"
        placeholder="Event description"
        ref={descriptionMessage}
        className="event description"
      />
      <div className="new_time">
        <label htmlFor="startTime">Start Time</label>
        <input type="time" name="startTime" ref={startTime} />
        <label htmlFor="endTime">End Time</label>
        <input type="time" name="endTime" ref={endTime} />
      </div>
      <div className="color_event">
        <p style={{ margin: "0 10px 0 0" }}>Choose your color : </p>
        {colors.map((color) => (
          <input
            key={`${color.color}${color.value}`}
            type="radio"
            name="color"
            id={color.color}
            value={color.value}
            onChange={handleChange}
          />
        ))}
      </div>
      <CustomButton
        suffixClass={"_yellow event submit"}
        innerText={"Envoyer"}
        handleClick={() =>
          addNewEvent(
            null,
            props.dateValue,
            descriptionMessage.current?.value,
            true
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
            descriptionMessage.current?.value,
            false
          )
        }
      />
    </>
  );
};

export default EventForm;
