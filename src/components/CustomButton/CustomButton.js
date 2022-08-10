import gapi_initiate from "../../functions/gapi_initiate";
import "./CustomButton.css";

const CustomButton = ({eventId, suffixClass, innerText, handleClick}, setSubmitMessage) => {
  var color = '';
  if (suffixClass) color = suffixClass;

  const deleteEvent = (eventId) => {
    const params = {
        eventId: eventId,
    }
    gapi_initiate("DELETE", params, null, null, setSubmitMessage,"Evénement supprimé !");

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
