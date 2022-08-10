import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import gapi_initiate from "../../functions/gapi_initiate";

import refresh from "../../assets/logo/refresh.svg";
import "./ListEvents.css";

const ListEvents = () => {
  const [events, setEvents] = useState();
  const [animRefresh, setAnimRefresh] = useState();
  const keys = ["date", "heure", "description", "deleteEvent"];
  const headers = ["Date", "Horaire", "Description", ""];

  const getEvents = async () => {
    let params = {
      maxResults: 11,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    }

    gapi_initiate("GET", params, setEvents);

    setAnimRefresh("anim_refresh");

    setTimeout(() => {
      setAnimRefresh("");
    }, 2000);
  };

   
  useEffect(() => {
    getEvents();
    console.log(events)
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
