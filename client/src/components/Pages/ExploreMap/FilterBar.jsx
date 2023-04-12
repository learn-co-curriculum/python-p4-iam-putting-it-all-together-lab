import React, { useContext, Component, useState, useRef } from "react";
import { UserContext } from "../../context";
import Select from "react-select";
import "./FilterBar.css"

function FilterBar(props, ref) {
    const { allUnits, handlePSearch, searchState, filteredUnits, updateSearch } = useContext(UserContext);


    return (
        <div className="filter-bar">

            <form className="explore-search-div">
                    <input placeholder="   Find your new neighbor!" onChange={updateSearch} className="explore-search"></input>
            </form>


            <select className="dropdown-select">
                <option value="" disabled defaultValue="Price" >Price</option>
                <option value="1000">up to $1000 </option>
                <option value="1500">up to $1500 </option>
                <option value="2000">up to $2000 </option> 
                <option value="2500">up to $2500 </option>
                <option value="3000">up to $3000 </option>
                <option value="3500">up to $3500 </option>
                <option value="4000">up to $4000 </option>
                <option value="4500">up to $4500 </option>
                <option value="5000">up to $5000 </option>
                <option value="6000">up to $6000 </option>
                <option value="7000">up to $7000 </option>
                <option value="8000">up to $8000 </option>
                <option value="9000">up to $9000 </option>
            </select>

            <select className="dropdown-select">
                <option value=""disabled defaultValue="Beds">Beds</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4+ Beds</option>
            </select>

            <select className="dropdown-select">
                <option value="" disabled defaultValue="Baths" >Baths</option>
                <option value="1">1 Bath </option>
                <option value="2">2 Baths </option>
                <option value="3">3 Baths </option>
            </select>

        </div>
    );
}

export default React.forwardRef(FilterBar);
