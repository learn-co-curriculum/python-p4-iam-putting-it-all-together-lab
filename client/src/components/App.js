import React, { useEffect, useState, createContext, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Pages/Global/TopBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import Landing from "./Pages/Landing/Landing.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import NewLeaseForm from "./Lease/NewLeaseForm";
import NewUnitForm from "./Unit/NewUnitForm";

import {UserProvider} from "./context.js"



function App() {



  
  return (
    
  <UserProvider >
    <div className="app">
      <NavBar   />
      <main>
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/dashboard">
            <Dashboard  />
          </Route>

          <Route path="/newunit">
              <NewUnitForm />
          </Route>

          <Route path="/newLease">
            <NewLeaseForm />
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
