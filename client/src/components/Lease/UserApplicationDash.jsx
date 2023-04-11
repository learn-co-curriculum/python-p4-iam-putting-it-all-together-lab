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
                <h1>test</h1>
                <button onClick={() => setSelectedApplication(app)}>select app</button>
                <h1>{app.status}</h1>
            </div>
        ));
    }
    return null;
}

export default UserApplicationDash;
