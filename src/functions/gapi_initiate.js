import { gapi } from "gapi-script";

const gapi_initiate = (method, paramsEvent, setEvents, setSubmitMessage) => {
  let params, body;

  switch (method) {
    case "GET":
      params = paramsEvent;
      body = null;
      break;

    case "POST":
      params = null;
      body = paramsEvent
      break;

    default:
      break;
  }

  gapi.client
    .init({
      apiKey: process.env.REACT_APP_API_KEY,
      clientId: process.env.REACT_APP_CLIENT_ID,
      scope: process.env.REACT_APP_SCOPES,
    })
    .then(() => {
      return gapi.client.request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_MATT}/events`,
        method: method,
        params: params,
        body: body
      });
    })
    .then(
      (response) => {
        if (method === "GET" && response.status === 200) {
          let events = response.result.items;
          console.log(events);
          setEvents(events);
        } else {
          setSubmitMessage("L'évènement a bien été ajouté au calendrier");
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

export default gapi_initiate;
