import { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../../contexts/eventsContext";
import EventForm from "../EventForm/EventForm";

import "./AddEvent.css";
import "react-calendar/dist/Calendar.css";

const AddEvent = () => {
  const [value, onChange] = useState(new Date());
  const [tabs, setTabs] = useState(0);
  const { submitMessage } = useEvents();

  return (
    <div className="add_event">
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={tabs === 0 ? true : false}
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
            <EventForm dateValue={value}/>
          ) : (
            <EventForm dateValue={value} name="new" />
          )}
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            {submitMessage}
          </p>
        </div>

        {/* TODO: make a component with title, startTime, endTime, color */}
      </div>
    </div>
  );
};

export default AddEvent;
