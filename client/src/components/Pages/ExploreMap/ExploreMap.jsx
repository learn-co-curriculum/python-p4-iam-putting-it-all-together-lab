import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom"
import UnitMapCards from "../../Unit/UnitMapCards";
import UnitAllCards from "../../Unit/UnitAllCards";
import { UserContext } from "../../context"
import FilterBar from "./FilterBar.jsx"


function ExploreMap() {
    const { allUnits, searchState, updateSearch, filteredUnits } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/explore")
    }

    return (
        <div className="explore-map-container">
            <div className = "explorer-filter-container-">
            
            
                <FilterBar />
            
            </div>

            <div className="explore-map">
                <div className="explore-map-cards">
                    {(searchState === "All")?
                    <UnitAllCards />
                    :
                    <UnitMapCards />
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default ExploreMap;
