import React, {useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../styles";
// import Login from "../../../pages/Login";
import {useHistory} from "react-router-dom";
import  {UserContext}  from "../../context.js";

import "./TopBar.css"

function NavBar() {

  const {user, setUser, allUnits, setFilteredUnits} = useContext(UserContext)

  const history = useHistory();
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
        history.push("/landing");
      }
    });
  }

  const renderAllUnits = () => {
    console.log("renderAllUnits")
    setFilteredUnits(allUnits)
  }

  return (
      <div className = "top-bar">

        <div className = "logo">
        <Link to="/home">DOORi</Link>
        </div>
      
      <nav className = "top-bar-buttons-container">
        <a href="/dashboard">
          <button onClick={()=>renderAllUnits()} variant="outline">
            Dashboard
          </button>
        </a>

        <a href="/explore">
        <button onClick={renderAllUnits} variant="outline">
          Explore
        </button>
        </a>

        <a href="/login">
        <button variant="outline">
          Login
        </button>
        </a>
        <Link to="/landing">
        <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button>
        </Link>
      </nav>

      </div>

  );
}


export default NavBar;
