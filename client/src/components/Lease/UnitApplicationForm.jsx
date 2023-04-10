import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";

function UnitApplicationForm() {
    const {
        user,
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
        <div className="unit-application-form">
            <h2>Application Form</h2>
            {user ? (
                <div className="application-renter-div">
                    <h4>Renter's Info</h4>
                    <li> ---Personal Info </li>
                        <li> First Name: <span>{user.first_name}</span> </li>
                        <li> Last Name: <span>{user.last_name}</span> </li>
                        <li> Date of Birth: <span>{user.dob}</span> </li>
                        <li> Phone: <span>{user.phone}</span> </li>
                        <li> Email: <span>{user.email}</span> </li>
                    <li> ---Current Address </li>
                        <li> House #: <span>{user.lot}</span> </li>
                        <li> Street: <span>{user.street}</span> </li>
                        <li> City: <span>{user.city}</span> </li>
                        <li> State: <span>{user.state}</span> </li>
                        <li> Zip Code: <span>{user.zip}</span> </li>
                </div>
            ) : <div>Uh Oh.. Something went wrong. Please try logging out and back in again.</div>
        }
        {currentAppUnit ? (
                <div className="application-unit-div">
                <h4>Unit Info</h4>
                <li>--Address</li>
                <li>Lot: <span>{currentAppUnit.lot}</span></li>
                <li>Street: <span>{currentAppUnit.street}</span></li>
                <li>City: <span>{currentAppUnit.city}</span></li>
                <li>State: <span>{currentAppUnit.state}</span></li>
                <li>Zip: <span>{currentAppUnit.zip}</span></li>
                <li>Unit Number: <span>{currentAppUnit.unit_num}</span></li>
<li>--Details</li>
                <li>Unit Type: <span>{currentAppUnit.unit_type}</span></li>
                <li>Unit Size: <span>{currentAppUnit.sqft}</span></li>
                <li>Unit Beds: <span>{currentAppUnit.beds}</span></li>
                <li>Unit Baths: <span>{currentAppUnit.baths}</span></li>
                <li>Unit Rent: <span>{currentAppUnit.rent}</span></li>
                <li>--Landlord Info</li>
                {/* <li>Landlord Name: <span>{currentAppUnit.lessor.first_name}</span></li> */}
                </div>    
                ) : <h4>Please Select a Unit for this Application</h4>
        }
        </div>
    );
}

export default UnitApplicationForm;
