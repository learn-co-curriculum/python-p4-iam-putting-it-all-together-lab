import React, {useState} from "react";
import Sidebar from "../Global/Sidebar.jsx";
import "./Dashboard.css"
import UnitCards from "../../Unit/UnitMapCards.jsx"
import UserContext from "../../context.js"
import UserUnitsDash from "../../Unit/UserUnitsDash.jsx";
import UserApplicationDash from "../../Lease/UserApplicationDash.jsx";

function Dashboard() {

const [showUnits, setShowUnits] = useState(false)
const [showApplications, setShowApplications] = useState(false)

function toggleShowUnits() {
    showUnits ? setShowUnits(false) : setShowUnits(true)
    setShowApplications(false)
}

function toggleShowApplications() {
    showApplications ? setShowApplications(false) : setShowApplications(true)
    setShowUnits(false)
}

    return (
        <div className="dashboard-page">
            <Sidebar />
        <div className="dashboard-container">
            <div className="dash-tag" onClick={toggleShowUnits}>Units</div>
            {showUnits ? <UserUnitsDash /> : null}
            
            <div className="dash-tag" onClick={toggleShowApplications}>Applications</div>
            {showApplications ? <UserApplicationDash /> : null}
        </div>
        </div>
    );
}

export default Dashboard;
