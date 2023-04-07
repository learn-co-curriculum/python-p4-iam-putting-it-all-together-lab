import React, {useContext, useState} from "react"
import UserContext from "../../context.js"
import UnitFeaturedCards from "../../Unit/UnitFeaturedCards.jsx"
import "./Home.css"

function Home() {
    return (
        <div className="home-container">
            <div className="search-wrapper">
                <div className="tagline">Meet your new neighbor with <span className="doori-1">DOORi</span></div>
                <input className="home-search"></input>
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