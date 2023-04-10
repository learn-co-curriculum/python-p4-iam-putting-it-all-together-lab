import React from "react";
import Sidebar from "../Global/Sidebar.jsx";
import "./Dashboard.css"
import UnitCards from "../../Unit/UnitMapCards.jsx"
import UserContext from "../../context.js"
import UserUnitsDash from "../../Unit/UserUnitsDash.jsx";

function Dashboard() {
    return (
        <div className="dashboard-page">
        <div className="dashboard-container">
            <Sidebar />
            <UserUnitsDash />
        </div>
        </div>
    );
}

export default Dashboard;
