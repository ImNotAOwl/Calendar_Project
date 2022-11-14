import { useEvents } from "../../contexts/eventsContext";
import axios from "../../config/axios";
import "./CustomButton.css";

const CustomButton = ({ eventId, suffixClass, innerText, handleClick }) => {
  const { setSubmitMessage, events, token } = useEvents();
  let color = "";
  if (suffixClass) color = suffixClass;

  const deleteEvent = async (eventId) => {
    const response = await axios.delete(`/${eventId}?sendUpdates=none`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) setSubmitMessage("Evénement supprimé");

    events.forEach((oneEvent, index) => {
      if (oneEvent.id === eventId) {
        events.splice(index, 1);
      }
    });

    setTimeout(() => {
      setSubmitMessage("");
    }, 4000);
  };

  return (
    <>
      <input
        className={`button_basic${color}`}
        type={"button"}
        onClick={handleClick ? handleClick : () => deleteEvent(eventId)}
        value={innerText}
        key={`button-${eventId}`}
      />
    </>
  );
};

export default CustomButton;
