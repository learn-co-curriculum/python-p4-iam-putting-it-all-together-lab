import React, {useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../styles";
// import Login from "../../../pages/Login";
import {useHistory} from "react-router-dom";
import  {UserContext}  from "../../context.js";

import "./TopBar.css"

console.log(`Topbar: ${UserContext}`)

function NavBar() {

  const {user, setUser} = useContext(UserContext)

  const history = useHistory();
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
        history.push("/landing");
      }
    });
  }

  return (
      <div className = "top-bar">

        <div className = "logo">
        <Link to="/home">DOORi</Link>
        </div>
      
      <nav className = "top-bar-buttons-container">
        <a href="/dashboard">
          <button variant="outline">
            Dashboard
          </button>
        </a>

        <a href="/login">
        <button variant="outline">
          Login
        </button>
        </a>

        <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>

      </div>

  );
}


export default NavBar;
