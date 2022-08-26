
const EventForm = () => {
  return (
    <div className="event_form">
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
    </div>
  );
};

export default EventForm;
