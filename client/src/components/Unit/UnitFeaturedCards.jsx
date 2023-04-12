import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
// import '../../styles/tailwind.css'
import "./UnitFeaturedCards.css";

function UnitFeaturedCards() {
    const { allUnits } = useContext(UserContext);



    const featuredUnitCards = allUnits.slice(-4).map((unit) => {
        const {
            id,
            name,
            unit_num,
            image_url,
            type,
            lot,
            street,
            city,
            state,
            zip,
            beds,
            baths,
            sqft,
        } = unit;

        return (
            <div className=".sm: f-unit-card-div" key={id}>
                <div className="f-unit-card-slides">
                    {/* <img src={unit.img_url} alt="unit" /> */}
                    <img
                        className="w-6 f-unit-card-image"
                        src={image_url}
                    />
                </div>

                <div className="f-unit-card-info">
                    <h4>{name}</h4>

                    <p>
                        <span>{lot}</span>
                        <span> {street}</span>
                        <span> {city}</span>
                        <span> {state},</span>
                        <span> {zip}</span>
                    </p>
                    <li>Unit Number:{unit_num}</li>

                    <div className="f-bed-bath-tag">
                        <p>
                            <span className="b">Beds:</span>{" "}
                            <span>{beds} </span>
                            <span className="b">Beds:</span>{" "}
                            <span>{beds} </span>
                        </p>
                        <p>
                            <span className="b">Sqft:</span> <span>{sqft}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    });
    return <div className="f-scroll-div">{featuredUnitCards}</div>;
}

export default UnitFeaturedCards;
