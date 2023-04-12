import React, { useEffect, useState, createContext, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Pages/Global/TopBar";
import Login from "../pages/Login";
import Landing from "./Pages/Landing/Landing.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import NewLeaseForm from "./Lease/NewLeaseForm";
import NewUnitForm from "./Unit/NewUnitForm";
import EditUnitForm from "./Unit/EditUnitForm";
import Home from "./Pages/Home/Home.jsx";
import ExploreMap from "./Pages/ExploreMap/ExploreMap.jsx";
import UnitApplication from "./Lease/UnitApplication.jsx";
import "./index.css";
import {UserProvider} from "./context.js"  



function App() {



  
  return (
    
  <UserProvider >
    <div className="app">
      <NavBar />
      <main>
        <Switch>

          <Route path="/login"><Login /></Route>
          <Route path="/explore"><ExploreMap /></Route>

          <Route path="/dashboard">
            <Dashboard  />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          
          <Route path="/newunit">
              <NewUnitForm />
          </Route>

          <Route path="/editunit">
              <EditUnitForm />
          </Route>

          <Route path="/newLease">
            <NewLeaseForm />
          </Route>

          <Route path="/unit_application">
            <UnitApplication  />
          </Route>

          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </main>
    </div>
  </UserProvider>
  );
}

export default App;
