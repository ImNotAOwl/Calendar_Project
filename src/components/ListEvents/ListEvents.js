import { useEffect } from "react";
import { useEvents } from "../../contexts/eventsContext";
import ItemList from "../ItemList/ItemList";
import refresh from "../../assets/logo/refresh.svg";
import "./ListEvents.css";
import { useRef } from "react";

const ListEvents = () => {
  const keys = ["date", "heure", "titre", "deleteEvent"];
  const headers = ["Date", "Horaire", "Titre Événement", ""];
  const { getEvents, animRefresh, events } = useEvents();
  const newStartDate = useRef();
    
  useEffect(() => {
    getEvents();
    console.log(events)
  }, []);
  
  return (
    <div className="list_events" style={{ margin: "50px 0" }}>
      <div className="refresh_container">
        <div className="search_date">
          <label htmlFor="search_date">Start date of the Event List</label>
          <input type="date" name="search_date" ref={newStartDate} />
        </div>
        <img
          src={refresh}
          alt="Circular arrow"
          onClick={() => {getEvents(newStartDate.current.value); newStartDate.current.value = '' }}
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
