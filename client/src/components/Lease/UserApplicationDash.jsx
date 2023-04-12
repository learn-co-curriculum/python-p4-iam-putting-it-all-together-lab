import React, { useContext, useState } from "react";
import { UserContext } from "../context.js";
console.log("test")

function UserApplicationDash() {
    const {
        user,
        userApplications,
        selectedApplication,
        setSelectedApplication,
    } = useContext(UserContext);

    console.log(userApplications)

    if (userApplications) {
        return userApplications.map((app) => (
            <div className="user-application-card" key={app.id}>
                <button onClick={() => setSelectedApplication(app)}>select app</button>
                <h4>{app.status}</h4>
                <h4>{app.unit.name}</h4>
            </div>
        ));
    }
    return null;
}

export default UserApplicationDash;
