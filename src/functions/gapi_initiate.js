import { gapi } from "gapi-script";
import moment from "moment";
import CustomButton from "../components/CustomButton/CustomButton";

const gapi_initiate = (method, paramsEvent, setEvents, setSubmitMessage, textMessage) => {
  let params, body, eventID;

  switch (method) {
    case "GET":
      params = paramsEvent;
      body = null;
      eventID = '';
      break;

    case "POST":
      params = null;
      body = paramsEvent;
      eventID = '';
      break;

    case "DELETE":
      params = null;
      body = null;
      eventID = `/${paramsEvent.eventId}`;
      break;

    default: 
      params = paramsEvent;
      body = null;
      break;
      
  }


  const initiate = () => {
    gapi.client
      ?.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPES,
      })
      .then(() => {
        return gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_MATT}/events${eventID}`,
          method: method,
          params: params,
          body: body,
        });
      })
      .then(
        (response) => {
          if (method === "GET" && response.status === 200) {
            let events = response.result.items;
            let result = [];
            events.forEach((onEvent) => {
              let newOneEvent = {
                date: onEvent["start"].dateTime
                  ? `${moment(onEvent["start"].dateTime).format(
                      "DD/MM/YYYY")}` !== `${moment(onEvent["end"].dateTime).format("DD/MM/YYYY")}`
                    ? `${moment(onEvent["start"].dateTime).format(
                        "DD/MM/YYYY")}${moment(onEvent["end"].dateTime).format(" - DD/MM/YYYY")}`
                    : `${moment(onEvent["start"].dateTime).format("DD/MM/YYYY")}`
                  : moment(onEvent["start"].date).format("DD/MM/YYYY"),
                heure:
                  onEvent["start"].dateTime !== undefined
                    ? `${moment(onEvent["start"].dateTime).format("H[h]mm")}
                      ${moment(onEvent["end"].dateTime).format("- H[h]mm")}`
                    : "Journée entière",
                description: onEvent.summary,
                colorId: onEvent.colorId,
                deleteEvent: <CustomButton eventId={onEvent.id} innerText={`Supprimer`} suffixClass={'red'} setSubmitMessage/>
              };
              result = [...result, newOneEvent];
              console.log(onEvent);
            });
            console.log(result);
            setEvents(result);
          } else {
            setSubmitMessage(textMessage);
            setTimeout(() => {
              setSubmitMessage("");
            }, 4000);
          }
        },
        function (err) {
          return [false, err];
        }
      );
  };

  gapi.load("client", initiate());
};

export default gapi_initiate;
