import React, { useState, useContext} from "react";
import {UserContext} from "../context.js";
import "./NewUnitForm.css"

function NewUnitForm() {

    
    const {user} = useContext(UserContext)

    console.log(`user: ${UserContext}`)

    const [formData, setFormData] = useState({
        lessor_id: 0,
        name: "",
        unit_num: "",
        lot: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        beds: "",
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
                    unit_num: "",
                    lot: "",
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    beds: "",
                    sqft: "",
                    price: "",
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Unit Number:
                <input
                    type="text"
                    name="unit_num"
                    value={formData.unit_num}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Lot:
                <input
                    type="text"
                    name="lot"
                    value={formData.lot}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Street:
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                State:
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Zip:
                <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Beds:
                <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Sqft:
                <input
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
}

export default NewUnitForm;
