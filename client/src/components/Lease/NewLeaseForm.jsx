import React, { useState, useContext } from "react";
import {UserContext} from "../context.js";



function NewLeaseForm() {
    const user = useContext(UserContext)
    function Input({ label, id, name, type, value, onChange }) {
        return (
            <div>
                <label htmlFor={id}>{label}</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }

    const [leaseData, setLeaseData] = useState({
        lessor_id: "",
        lessee_id: "",
        unit_id: "",
        rent: "",
        sec_deposit: "",
        beds: "",
        baths: "",
        sqft: "",
        type: "",
        util_incld: "",
        util_excld: "",
        lot: "",
        street: "",
        unit_num: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLeaseData({
            ...leaseData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/leases", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leaseData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create lease");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // reset form data
                setLeaseData({
                    lessor_id: "",
                    lessee_id: "",
                    unit_id: "",
                    rent: "",
                    sec_deposit: "",
                    beds: "",
                    baths: "",
                    sqft: "",
                    type: "",
                    util_incld: "",
                    util_excld: "",
                    lot: "",
                    street: "",
                    unit_num: "",
                    city: "",
                    state: "",
                    zip: "",
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Create a New Lease</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Lessor ID:"
                    id="lessor_id"
                    name="lessor_id"
                    type="text"
                    value={leaseData.lessor_id}
                    onChange={handleInputChange}
                />
                <Input
                    label="Lessee ID:"
                    id="lessee_id"
                    name="lessee_id"
                    type="text"
                    value={leaseData.lessee_id}
                    onChange={handleInputChange}
                />
                <Input
                    label="Unit ID:"
                    id="unit_id"
                    name="unit_id"
                    type="text"
                    value={leaseData.unit_id}
                    onChange={handleInputChange}
                />
                <Input
                    label="Rent:"
                    id="rent"
                    name="rent"
                    type="text"
                    value={leaseData.rent}
                    onChange={handleInputChange}
                />
                <Input
                    label="Security Deposit:"
                    id="sec_deposit"
                    name="sec_deposit"
                    type="text"
                    value={leaseData.sec_deposit}
                    onChange={handleInputChange}
                />
                <Input
                    label="Beds:"
                    id="beds"
                    name="beds"
                    type="text"
                    value={leaseData.beds}
                    onChange={handleInputChange}
                />
                <Input
                    label="Baths:"
                    id="baths"
                    name="baths"
                    type="text"
                    value={leaseData.baths}
                    onChange={handleInputChange}
                />
                <Input
                    label="Square Feet:"
                    id="sqft"
                    name="sqft"
                    type="text"
                    value={leaseData.sqft}
                    onChange={handleInputChange}
                />
                <Input
                    label="Type:"
                    id="type"
                    name="type"
                    type="text"
                    value={leaseData.type}
                    onChange={handleInputChange}
                />
                <Input
                    label="Utilities Included:"
                    id="util_incld"
                    name="util_incld"
                    type="text"
                    value={leaseData.util_incld}
                    onChange={handleInputChange}
                />
                <Input
                    label="Utilities Excluded:"
                    id="util_excld"
                    name="util_excld"
                    type="text"
                    value={leaseData.util_excld}
                    onChange={handleInputChange}
                />
                <Input
                    label="Lot:"
                    id="lot"
                    name="lot"
                    type="text"
                    value={leaseData.lot}
                    onChange={handleInputChange}
                />
                <Input
                    label="Street:"
                    id="street"
                    name="street"
                    type="text"
                    value={leaseData.street}
                    onChange={handleInputChange}
                />
                <Input
                    label="Unit Number:"
                    id="unit_num"
                    name="unit_num"
                    type="text"
                    value={leaseData.unit_num}
                    onChange={handleInputChange}
                />
                <Input
                    label="City:"
                    id="city"
                    name="city"
                    type="text"
                    value={leaseData.city}
                    onChange={handleInputChange}
                />
                <Input
                    label="State:"
                    id="state"
                    name="state"
                    type="text"
                    value={leaseData.state}
                    onChange={handleInputChange}
                />
                <Input
                    label="Zip:"
                    id="zip"
                    name="zip"
                    type="text"
                    value={leaseData.zip}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Lease</button>
            </form>
        </div>
    );
}

export default NewLeaseForm;
