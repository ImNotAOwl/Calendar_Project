import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import UserCard from "../UserCard/UserCard";
import "./AuthCalendarApp.css";
import { useEvents } from "../../contexts/eventsContext";
import { clientId, calendarScopes } from "../../config/config.env";

const AuthCalendarApp = ({ user, setUser }) => {
  const {setToken} = useEvents();

  const onSuccess = (response) => {
    console.log("LOGIN :", response);
    setUser({
      name: response.profileObj.name,
      profileImg: response.profileObj.imageUrl,
    });
    setToken(response.accessToken);
  };
  
  const onFailure = (response) => {
    console.log("FAILURE", response);
  };

  const onLogoutSuccess = (response) => {
    console.log("Log Out", response);
    setUser();
  }

  if (user) {
    return (
      <div className="google_login">
        <UserCard user={user} />
          <GoogleLogout
            clientId={clientId}
            render={(renderProps) => (
              <div
                id="customBtn"
                className="btn login"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Logout
              </div>
            )}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
      </div>
    );
  }

  return (
    <div className="google_login">
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <div
            id="customBtn"
            className="btn logout"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login
          </div>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        scope={calendarScopes}
      />
    </div>
  );
};

export default AuthCalendarApp;
