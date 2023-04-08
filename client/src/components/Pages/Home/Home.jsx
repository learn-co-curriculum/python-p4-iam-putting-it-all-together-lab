import React, {useContext, useState} from "react"
import {useHistory} from "react-router-dom"
import {UserContext} from "../../context.js"
import UnitFeaturedCards from "../../Unit/UnitFeaturedCards.jsx"
import "./Home.css"



function Home() {

    const { updateSearch } = useContext(UserContext);

    const history = useHistory();

    const handleSubmit = (e) => {
        console.log("click")
        e.preventDefault();
        history.push("/explore")
    }

////figure out why Explorer map isnt rendering. get it to render first w/o search
///create new state for filteredunits? use that instead of allUnits?


    return (
        <div className="home-container">
            <div className="search-wrapper">
                <div className="tagline">Meet your new neighbor with <span className="doori-1">DOORi</span></div>
                <form className="home-search-div"
                onSubmit = {handleSubmit}>
                    <input onChange={updateSearch} className="home-search"></input>
                    <button type="submit" href="/explore" className="home-search-button">Search</button>
                </form>
                <div className="search-sliding-background"></div>
            </div>
            <div>
                <div className="feature-tag">Find a new neighbor in Brooklyn</div>
                <UnitFeaturedCards />
            </div>
        </div>
    )
}

export default Home