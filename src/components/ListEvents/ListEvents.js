import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import ItemList from "../ItemList/ItemList";
import refresh from "../../assets/logo/refresh.svg";

import "./ListEvents.css";

const ListEvents = () => {
  const [events, setEvents] = useState();
  const [animRefresh, setAnimRefresh] = useState();
  const keys = ["updated", "summary", "status"];
  const headers = ["Date", "Description", "Status"];

  const getEvents = () => {

    setAnimRefresh("anim_refresh");
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
            console.log(events);
            setEvents(events);
          },
          function (err) {
            return [false, err];
          }
        );
    };
    gapi.load("client", initiate);

    setTimeout(() => {
      setAnimRefresh("");
    }, 2000);
  };

  useEffect(() => {
    getEvents();
    console.log(events);
  }, []);

  return (
    <div className="list_events" style={{ margin: "50px 0" }}>
      <div className="refresh_container">
        <img
          src={refresh}
          alt="Circular arrow"
          onClick={getEvents}
          className={`refresh_arrow ${animRefresh}`}
        />
        
      </div>
      {!events ? (
        <></>
      ) : (
        <ItemList
          name={"calendar_events"}
          headers={headers}
          keys={keys}
          data={events}
          key={"item-list"}
        />
      )}
    </div>
  );
};

export default ListEvents;
