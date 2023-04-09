import React, { useEffect, useState, createContext } from "react";


const UserContext = createContext() 

    const UserProvider = ({ children }) => {
    
const [user, setUser] = useState(null);
const [allUnits, setAllUnits] = useState([]);
const [userUnits, setUserUnits] = useState([])
const [pSearchResults, setPSearchResults] = useState([])
const [loggedIn, setLoggedIn] = useState(false)
const [searchState, setSearchState] = useState("All")
const [filteredUnits, setFilteredUnits] = useState([])

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


//////handle Property search //////////////////

function updateSearch(e) {
  e.preventDefault()
  const value = e.target.value
  console.log(value)
  setSearchState(value)
}

function handlePSearch(e) {
  e.preventDefault()
  const value = searchState
  const results = allUnits.filter((unit) => unit.address.includes(value))
  setPSearchResults(results)
}

useEffect(() => {
  setFilteredUnits(allUnits)
},[allUnits])

useEffect(() => {
  if (searchState.length === 0 || searchState === "") {
    setFilteredUnits(allUnits);
  } else {
    const fUnits = allUnits.filter((unit) => {
      return (
        unit.name.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.unit_num.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.lot.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.street.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.city.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.state.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.zip.toString().toLowerCase().includes(searchState.toLowerCase().trim()) ||
        unit.sqft.toString().toLowerCase().includes(searchState.toLowerCase().trim())
      );
    });
    setFilteredUnits(fUnits);
  }
}, [searchState, allUnits]);

// need to use useEffect to set up address concatenation and set it some a state that's an array of objects with lat/long


// useEffect(() => {
//   console.log(allUnits)

// },[])
// console.log(allUnits)
// ///////// To Convert Address to Lat/Long //////////
// const u = allUnits[0]
// console.log(u)


// const address = u.lot + " " + u.street + " " + u.city + " " + u.state + " " + u.zip

// console.log(address)
// const addressArr = []

// function showAddress() {
//   var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + 'address'
//   fetch(url)
//                 .then(response => response.json())
//                 .then(data => addressArr = data)
//                 .then(() => console.log(addressArr))
//                 .catch(err => console.log(err))    
// }





// function getLatLong(address) {
//   const geocoder = new google.maps.Geocoder();
//   geocoder.geocode({ address: address }, (results, status) => {
//     if (status === "OK") {
//       console.log(results[0].geometry.location.lat());
//       console.log(results[0].geometry.location.lng());
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });
// }




return (
    <UserContext.Provider value={{
        user,
        allUnits, 
        userUnits, 
        setUser,
        updateSearch,
        handlePSearch,
        filteredUnits,
        setFilteredUnits,
        searchState

    }}>
    {children}
    </UserContext.Provider>
)

}


export {UserContext, UserProvider} 