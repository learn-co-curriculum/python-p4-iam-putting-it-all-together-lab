import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
// import '../../styles/tailwind.css'
import "./UnitApplicationListView.css";

function UnitApplicationListView() {
    const { allUnits, handlePSearch, searchState, filteredUnits, setCurrentAppUnit, currentAppUnit } = useContext(UserContext);
    
    
    const filteredUnitCards =allUnits.map((unit) => {
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
            <div className="a-unit-card-div" 
            key={id}
            onClick={()=>setCurrentAppUnit(unit)}
            >

                <div className="a-unit-card-slides">
                    {/* <img src={unit.img_url} alt="unit" /> */}
                    <img
                        className="a-unit-card-image"
                        src="https://tinyurl.com/TestImg-brownstone"
                    />
                </div>
                <div className="a-unit-card-info">
                    <h4>{name}</h4>
                    
                    <p>
                        <span>{lot}</span>
                        <span> {street}</span>
                        <span> {city}</span>
                        <span> {state},</span>
                        <span> {zip}</span>
                    </p>
                    <li>Unit Number:{unit_num}</li>

                    <div className="a-bed-bath-tag">
                        <p><span className="b">Beds:</span> <span>{beds}   </span></p>
                        <p><span className="b">Sqft:</span> <span>{sqft}</span></p>
                    </div>

                </div>

            </div>
        );
    })
    return <div className="a-scroll-div">{filteredUnitCards}</div>;
}

export default UnitApplicationListView;
