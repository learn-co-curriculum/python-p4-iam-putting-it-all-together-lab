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

import UserContext from "./context.js"






function App() {

  // const [theme, colorMode] = useMode()


  const [user, setUser] = useState(null);
  const [allUnits, setAllUnits] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userUnits, setUserUnits] = useState([])
  
  
  useEffect(() => { // auto-login & set user variables
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      }
    });
  }, []);
  
  ///////////////////// UNITS BY ID //////////////////////////
  
  useEffect(() => { // fetch allUnits
    fetch("/units").then((r) => {
      if (r.ok) {
        r.json().then((units) => setAllUnits(units));
      }
    });    
  }, []);
  
  ///////////////////// CURRENT USER'S UNITS  ////////////////
  
  useEffect(() => {
    const uUnits = allUnits.filter((unit) => unit.lessor_id === userId)
    setUserUnits(uUnits)
  }, [allUnits, userId])
  
  console.log(`userId: ${userId}`)
  console.log(allUnits)
  console.log(userUnits)
  
  
  // if (!user) return <Login onLogin={setUser} />;
  // if (!user) return <Landing onLogin={setUser} />;
  
  return (
            <UserContext.Provider value={{user, setUser}}>
    <div className="app">
      <NavBar   />
      <main>
        <Switch>

          <Route path="/login">
            <Login onLogin={setUser} />
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
            </UserContext.Provider>
  );
}

export default App;
