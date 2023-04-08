import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
// import '../../styles/tailwind.css'
import "./UnitMapCards.css";

function UnitAllCards() {
    const { allUnits, handlePSearch, searchState, filteredUnits } = useContext(UserContext);
    
    
    const allUnitCards = allUnits.map((unit) => {
        const {
            id,
            name,
            unit_num,
            lot,
            street,
            city,
            state,
            zip,
            beds,
            sqft,
        } = unit;

        
        
        return (
            <div className=".sm: unit-card-div" key={id}>

                <div className="unit-card-slides">
                    {/* <img src={unit.img_url} alt="unit" /> */}
                    <img
                        className="w-6 unit-card-image"
                        src="https://tinyurl.com/TestImg-brownstone"
                    />
                </div>

                <div className="unit-card-info">
                    <h4>{name}</h4>
                    
                    <p>
                        <span>{lot}</span>
                        <span> {street}</span>
                        <span> {city}</span>
                        <span> {state},</span>
                        <span> {zip}</span>
                    </p>
                    <li>Unit Number:{unit_num}</li>

                    <div className="bed-bath-tag">
                        <p><span className="b">Beds:</span> <span>{beds}   </span></p>
                        <p><span className="b">Sqft:</span> <span>{sqft}</span></p>
                    </div>

                </div>

            </div>
        );
    })
    return <div className="scroll-div">{allUnitCards}</div>;
}
export default UnitAllCards;
