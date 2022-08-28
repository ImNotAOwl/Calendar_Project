import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import gapi_initiate from "../functions/gapi_initiate";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

const EventsContextProvider = ({children}) => {
    const [submitMessage, setSubmitMessage] = useState("");
    const [events, setEvents] = useState();
    const [animRefresh, setAnimRefresh] = useState();

    const getEvents = (selectedDate) => {
        console.log(moment(selectedDate).format("yyyy-MM-DD"));
        let params = {
          maxResults: 11,
          timeMin: selectedDate ? `${moment(selectedDate).format()}` : new Date().toISOString(),
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

    const value = {
        submitMessage,
        setSubmitMessage,
        events,
        setEvents,
        getEvents,
        animRefresh
    }

    return <EventsContext.Provider value={value}>
        {children}
    </EventsContext.Provider>
}
 
export default EventsContextProvider;