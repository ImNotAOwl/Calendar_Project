import React, { useEffect } from "react";
import UserCard from "../UserCard/UserCard";
import "./AuthCalendarApp.css";
import { useEvents } from "../../contexts/eventsContext";
import { clientId, calendarScopes } from "../../config/configuration.env";
import { useRef } from "react";
import axios from "axios";

const AuthCalendarApp = ({ user, setUser }) => {
  const { token, setToken } = useEvents();
  const loginButton = useRef();

  const initClient = () => {
    loginButton.current = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: calendarScopes,
      callback: (response) => {
        setToken(response.access_token);
      },
    });
  };

  const getToken = () => {
    loginButton.current.requestAccessToken();
  };

  const getUser = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({
        name: result.data.name,
        profileImg: result.data.picture,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const result = await axios.post(
        `https://oauth2.googleapis.com/revoke?token=${token}`
      );

      result.status === 200 && setUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  useEffect(() => {
    /* global google */
    initClient();
  }, []);

  if (user) {
    return (
      <div className="google_login">
        <UserCard user={user} />
        <div id="customBtn" className="btn logout" onClick={() => logout()}>
          Logout
        </div>
      </div>
    );
  } else {
    return (
      <div className="google_login">
        <div id="customBtn" className="btn login" onClick={() => getToken()}>
          Login
        </div>
      </div>
    );
  }
};

export default AuthCalendarApp;
