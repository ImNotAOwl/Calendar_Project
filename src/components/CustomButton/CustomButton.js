import { useEvents } from "../../contexts/eventsContext";
import gapi_initiate from "../../functions/gapi_initiate";
import "./CustomButton.css";

const CustomButton = ({eventId, suffixClass, innerText, handleClick}) => {
  const { setSubmitMessage, events } = useEvents();
  let color = '';
  if (suffixClass) color = suffixClass;

  const deleteEvent = (eventId) => {
    const params = {
        eventId: eventId,
    }
    gapi_initiate("DELETE", params);
    setSubmitMessage("Evénement supprimé");

    events.forEach((oneEvent, index) => {
      for (const key in oneEvent) {
        if (Object.hasOwnProperty.call(oneEvent, key)) {
          const element = oneEvent[key];
          if (element === eventId) events.splice(index,1)
        }
      }
    });

    setTimeout(() => {
        setSubmitMessage("");
    }, 4000);
  }

  return (
    <>
      <input
        className={`button_basic${color}`}
        type={"button"}
        onClick={handleClick ? handleClick : () => deleteEvent(eventId)}
        value={innerText}
      />
    </>
  );
};

export default CustomButton;