import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar-container">
            <h2>Menu</h2>
                <label>Select View</label>
            <select>
                <option>My Listings (set f(ct))</option>
                <option>Applications (set f(ct))</option>
                <option>Tenants </option>
                <option>Leases</option>
            </select>
            <br/>
            <ul>
                <li>
                    <Link to="/newunit">Add New Unit</Link>
                </li>
                <li>
                    <Link to="/newlease">Add new Lease</Link>
                </li>
                <li>
                    <Link to="/unit_application">Apply to Apartment</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
