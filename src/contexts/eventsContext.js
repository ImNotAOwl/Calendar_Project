import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "../config/axios";
import CustomButton from "../components/CustomButton/CustomButton";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

const EventsContextProvider = ({ children }) => {
  const [submitMessage, setSubmitMessage] = useState("");
  const [events, setEvents] = useState();
  const [animRefresh, setAnimRefresh] = useState();
  const [token, setToken] = useState();

  const getEventsAxios = async (selectedDate) => {
    setAnimRefresh("anim_refresh");

    setTimeout(() => {
      setAnimRefresh("");
    }, 2000);

    // console.log(moment(selectedDate).format("yyyy-MM-DD"));
    let options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        maxResults: 11,
        timeMin: selectedDate
          ? `${moment(selectedDate).format()}`
          : new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      },
    };

    const response = await axios.get(``, options);
    if (response) {
      // console.log(response);
      let events = response.data.items;
      let result = [];
      events.forEach((oneEvent) => {
        let newOneEvent = {
          id: oneEvent.id,
          date: oneEvent["start"].dateTime
            ? `${moment(oneEvent["start"].dateTime).format("DD/MM/YYYY")}` !==
              `${moment(oneEvent["end"].dateTime).format("DD/MM/YYYY")}`
              ? `${moment(oneEvent["start"].dateTime).format(
                  "DD/MM/YYYY"
                )}${moment(oneEvent["end"].dateTime).format(" - DD/MM/YYYY")}`
              : `${moment(oneEvent["start"].dateTime).format("DD/MM/YYYY")}`
            : moment(oneEvent["start"].date).format("DD/MM/YYYY"),
          heure:
            oneEvent["start"].dateTime !== undefined
              ? `${moment(oneEvent["start"].dateTime).format("H[h]mm")}
                      ${moment(oneEvent["end"].dateTime).format("- H[h]mm")}`
              : "Journée entière",
          titre: oneEvent.summary,
          colorId: oneEvent.colorId,
          eventId: oneEvent.id,
          deleteEvent: (
            <CustomButton
              eventId={oneEvent.id}
              innerText={`Supprimer`}
              suffixClass={"_red"}
            />
          ),
        };
        result = [...result, newOneEvent];
        // console.log(oneEvent);
      });
      // console.log(result);

      setEvents(result);
    }
  };

  useEffect(() => {
    if (token) getEventsAxios();
    // console.log(events);
  }, [token]);

  const value = {
    submitMessage,
    setSubmitMessage,
    events,
    setEvents,
    animRefresh,
    token,
    setToken,
    getEventsAxios,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

export default EventsContextProvider;
