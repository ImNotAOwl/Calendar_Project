import React, { useState } from "react";
import AddEvent from "../../components/AddEvent/AddEvent";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import ListEvents from "../../components/ListEvents/ListEvents";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="home">
      <GoogleLogin user={user} setUser={setUser} />
          <h1>My Calendar Application</h1>
      {user ? (
        <div>
          <AddEvent />
          <ListEvents />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
