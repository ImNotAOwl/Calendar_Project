import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import ItemList from "../ItemList/ItemList";

const ListEvents = () => {
  const [events, setEvents] = useState();
  const keys = ["updated", "summary", "status"];
  const headers = ["Date", "Description", "Status"];

  const getEvents = () => {
    const initiate = () => {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
        })
        .then(() => {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_CALENDAR_MATT}/events`,
            params: {
              maxResults: 11,
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              orderBy: "startTime",
            },
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err) {
            return [false, err];
          }
        );
    };
    gapi.load("client", initiate);
  };

  useEffect(() => {
    getEvents();
    console.log(events);
  }, []);

  return (
    <div>
      {/* <input type="button" value="List" onClick={getEvents} /> */}
      {!events ? (
        <></>
      ) : (
        <ItemList
          name={"calendar_events"}
          headers={headers}
          keys={keys}
          data={events}
          key={'item-list'}
        />
      )}
    </div>
  );
};

export default ListEvents;
