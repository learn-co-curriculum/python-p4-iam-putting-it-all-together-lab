import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./NewUnitForm.css";
import { Link } from "react-router-dom";

function NewUnitForm() {
    const { user } = useContext(UserContext);

    console.log(`user: ${UserContext}`);

    const [formData, setFormData] = useState({
        lessor_id: user.id,
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/units", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setFormData({
                    lessor_id: parseInt(user.id),
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
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const renderInput = (inputName, inputType = "text") => {
        return (
            <label>
                {inputName}:
                <input
                    type={inputType}
                    name={inputName}
                    value={formData[inputName]}
                    onChange={handleInputChange}
                />
            </label>
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            {renderInput("name")}
            {renderInput("unit_num")}
            {renderInput("lot")}
            {renderInput("street")}
            {renderInput("city")}
            {renderInput("state")}
            {renderInput("zip")}
            {renderInput("beds", "number")}
            {renderInput("sqft", "number")}
            {renderInput("price", "number")}
<Link to="/dashboard">Cancel</Link>
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewUnitForm;
