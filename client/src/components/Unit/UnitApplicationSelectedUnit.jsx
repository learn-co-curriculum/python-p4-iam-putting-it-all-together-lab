import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./UnitApplicationListView.css";

function UnitApplicationSelectedUnit() {
    const {
        allUnits,
        handlePSearch,
        searchState,
        filteredUnits,
        setCurrentAppUnit,
        currentAppUnit,
        unitOptionsApplication,
        setUnitOptionsApplication,
        appFormUnitPrefill,
    } = useContext(UserContext);

    const [opButtonText, setOpButtonText] = useState("Close Selection Window");

    function toggleUnitOptions() {
        console.log("toggle clicked");
        console.log(appFormUnitPrefill);
        console.log(unitOptionsApplication);
        if (unitOptionsApplication) {
            setOpButtonText("Change Unit Selection");
            setUnitOptionsApplication(!unitOptionsApplication);
        } else {
            setOpButtonText("Close Selection Window");
            setUnitOptionsApplication(!unitOptionsApplication);
        }
    }

    return currentAppUnit ? (
        <div className="a-unit-card-div">
            <div className="a-unit-card-slides">
                {/* <img src={unit.img_url} alt="unit" /> */}
                <img
                    className="a-unit-card-image"
                    src="https://tinyurl.com/TestImg-brownstone"
                />
            </div>
            <div className="a-unit-card-info">
                <h4>{currentAppUnit.name}</h4>

                <p>
                    <span>{currentAppUnit.lot}</span>
                    <span> {currentAppUnit.street}</span>
                    <span> {currentAppUnit.city}</span>
                    <span> {currentAppUnit.state},</span>
                    <span> {currentAppUnit.zip}</span>
                </p>
                <li>Unit Number:{currentAppUnit.unit_num}</li>

                <div className="a-bed-bath-tag">
                    <p>
                        <span className="b">Beds:</span>{" "}
                        <span>{currentAppUnit.beds} </span>
                    </p>
                    <p>
                        <span className="b">Sqft:</span>{" "}
                        <span>{currentAppUnit.sqft}</span>
                    </p>
                </div>
            </div>
            <button onClick={toggleUnitOptions}>{opButtonText}</button>
        </div>
    ) : (
        <></>
    );
}

export default UnitApplicationSelectedUnit;
