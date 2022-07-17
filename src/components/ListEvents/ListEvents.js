import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import ItemList from "../ItemList/ItemList";
import refresh from "../../assets/logo/refresh.svg";

import "./ListEvents.css";
import gapi_initiate from "../../functions/gapi_initiate";

const ListEvents = () => {
  const [events, setEvents] = useState();
  const [animRefresh, setAnimRefresh] = useState();
  const keys = ["updated", "summary", "status"];
  const headers = ["Date", "Description", "Status"];

  const getEvents = () => {
    let params = {
      maxResults: 11,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    }

    setAnimRefresh("anim_refresh");

    gapi.load("client", gapi_initiate("GET", params, setEvents));

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
          onClick={() => getEvents()}
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
