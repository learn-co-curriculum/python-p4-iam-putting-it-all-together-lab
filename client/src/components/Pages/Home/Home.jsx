import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context.js";
import UnitFeaturedCards from "../../Unit/UnitFeaturedCards.jsx";
import "./Home.css";

function Home() {
    const { updateSearch } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (e) => {
        console.log("click");
        e.preventDefault();
        history.push("/explore");
    };

    const avatarRef = useRef(null);

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 0.5,
        };
        const avatar = avatarRef.current;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                avatar.classList.add("animate");
            } else {
                avatar.classList.remove("animate");
            }
        }, options);
        observer.observe(avatar);
    }, []);

    return (
        <div>
        <div className="home-container">
            <div className="search-wrapper">
                <div className="search-sliding-background">
                    <div className="tagline">
                        Meet your new neighbor with{" "}
                        <span className="doori-1">DOORi</span>
                    </div>
                    <form className="home-search-div" onSubmit={handleSubmit}>
                        <input
                            onChange={updateSearch}
                            className="home-search"
                        ></input>
                        <button
                            type="submit"
                            href="/explore"
                            className="home-search-button"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <div className="featured-container">
                    <div className="feature-tag">
                        Find a new neighbor in New York
                    </div>
                    <UnitFeaturedCards />
                    <Link to="/explore">
                        <button>Explore More</button>
                    </Link>
                </div>
                <div className="about-doori">
                    <div className="feature-tag">About DOORi</div>
                    <p>
                        DOORi is a Brooklyn-based property management company
                        founded in April 2023 with a mission to introduce you to
                        your new neighbor.
                    </p>
                    <br />
                    <p>
                        As a small business owner, we understand the importance
                        of creating strong relationships with both property
                        owners and tenants. We pride ourselves on providing a
                        seamless and stress-free experience for our clients by
                        managing all aspects of property management from rent
                        collection to maintenance requests.
                    </p>
                    <br />
                    <p>
                        Our team consists of experienced professionals who are
                        passionate about delivering exceptional service to our
                        clients. At DOORi, we believe that finding the right
                        property and the right tenant is crucial, and we are
                        committed to helping our clients achieve their goals.
                        Let us be your trusted partner in managing your
                        property, so you can focus on what matters most.
                    </p>
                    <br />
                </div>
            </div>
        </div>
            <div className="av-container">
                <img
                    className="avatar"
                    src="https://i.ibb.co/pQRV3K2/keino.png"
                    ref={avatarRef}
                />
                        <p>Keino</p>
            </div>
        </div>
    );
}

export default Home;
