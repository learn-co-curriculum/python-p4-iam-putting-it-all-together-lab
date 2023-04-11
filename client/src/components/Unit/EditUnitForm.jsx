import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context.js";

function EditUnitForm() {
    const {
        user,
        unitEditPrefill,
        setUnitEditPrefill,
        unitToEdit,
        setUnitToEdit,
    } = useContext(UserContext);

    const history = useHistory();


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUnitEditPrefill({ ...unitEditPrefill, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(unitEditPrefill),
        };
        fetch(`/units/${unitToEdit.id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update unit");
                }
                setUnitToEdit(null);
                setUnitEditPrefill({
                    name: "",
                    image_url: "",
                    type: "",
                    unit_num: "",
                    lot: "",
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    beds: "",
                    baths: "",
                    sqft: "",
                    price: "",
                });
                history.push("/dashboard");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    

    const formFields = Object.keys(unitEditPrefill).map((key) => (
        <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            <input
                type={key === "price" ? "number" : "text"}
                name={key}
                value={unitEditPrefill[key]}
                onChange={handleInputChange}
            />
        </label>
    ));

    return (
        <form onSubmit={handleSubmit}>
            {formFields}
            <button type="submit">Submit</button>
        </form>
    );
}

export default EditUnitForm;
