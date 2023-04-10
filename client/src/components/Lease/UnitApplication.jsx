import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import UnitApplicationForm from "./UnitApplicationForm.jsx";
import UnitApplicationListView from "../Unit/UnitApplicationListView.jsx";
import UnitApplicationSelectedUnit from "../Unit/UnitApplicationSelectedUnit.jsx";

function UnitApplication() {
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
        setAppFormUnitPrefill,
    } = useContext(UserContext);


    return (
        <div className="unit-application-page">
            <h1>Unit Application</h1>
            <div>
                {unitOptionsApplication ? <UnitApplicationListView /> : <></>}

                <UnitApplicationSelectedUnit />
            </div>

            <UnitApplicationForm />
        </div>
    );
}

export default UnitApplication;
