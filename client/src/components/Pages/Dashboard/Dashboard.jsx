import React from "react";
import Sidebar from "../Global/Sidebar.jsx";
import "./Dashboard.css"
import UnitList from "../../Unit/UnitList.jsx"
import UserContext from "../../context.js"

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <UnitList />
            {/* <UnitCard /> */}
        </div>
    );
}

export default Dashboard;
