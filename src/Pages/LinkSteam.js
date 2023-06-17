import React from "react";
import axios from "axios";

const LinkSteam = () => {
  const onLoginClicked = () => {
    console.log("linking steam account");
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/auth/steam`, {
        "Content-Type": "application/json",
      })
      .then((response) => {
        window.location = response.data.URL;
      });
  };

  return (
    <div>
      <h1>Part 2: LINK your steam account!</h1>

      <a href="https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=http://localhost:3001/auth/steam/authenticate?testID=test&openid.realm=http://localhost:3001">
        Login with Steam
      </a>
    </div>
  );
};

export default LinkSteam;
