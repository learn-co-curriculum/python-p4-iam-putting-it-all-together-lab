import React from "react";
import Sidebar from "../Global/Sidebar.jsx";
import "./Dashboard.css"
import UnitCards from "../../Unit/UnitMapCards.jsx"
import UserContext from "../../context.js"

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            {/* <UnitCards /> */}
        </div>
    );
}

export default Dashboard;
