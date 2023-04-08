import React, { useContext } from "react";
import {useHistory} from "react-router-dom"
import UnitMapCards from "../../Unit/UnitMapCards";
import UnitAllCards from "../../Unit/UnitAllCards";
import { UserContext } from "../../context"


function ExploreMap() {
    const { allUnits, searchState, updateSearch, filteredUnits } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/explore")
    }

    return (
        <div className="explore-map-container">
                            <form className="home-search-div"
                onSubmit = {handleSubmit}>
                    <input onChange={updateSearch} className="home-search"></input>
                    <button href="/explore" className="home-search-button">Search</button>
                </form>
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
