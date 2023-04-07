import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar-container">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/newunit">Add New Unit</Link>
                </li>
                <li>
                    <Link to="/newlease">Add new Lease</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
