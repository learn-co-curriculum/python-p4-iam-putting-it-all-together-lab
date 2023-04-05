import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import Landing from "./Pages/Landing/Landing.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;
  // if (!user) return <Landing onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewRecipe user={user} />
          </Route>

          <Route path="/login">
            <Login onLogin={setUser} />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
