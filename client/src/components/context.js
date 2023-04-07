import React, { useEffect, useState, createContext } from "react";


const UserContext = createContext() 

    const UserProvider = ({ children }) => {
    
const [user, setUser] = useState(null);
const [allUnits, setAllUnits] = useState([]);
const [userUnits, setUserUnits] = useState([])
const [loggedIn, setLoggedIn] = useState(false)

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

/////////////////////  CURRENT USER'S UNITS  ////////////////

useEffect(() => {
  if (user) { 
  const uUnits = allUnits.filter((unit) => unit.lessor_id === user.id)
  setUserUnits(uUnits)
  }
}, [allUnits, user])




return (
    <UserContext.Provider value={{
        user,
        allUnits, 
        userUnits, 
        setUser,
        
    }}>
    {children}
    </UserContext.Provider>
)

}


export {UserContext, UserProvider} 