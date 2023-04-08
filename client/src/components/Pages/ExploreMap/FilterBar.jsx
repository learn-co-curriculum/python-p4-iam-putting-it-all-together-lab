import React, { useContext } from 'react';
import { UserContext } from "../../context"



function FilterBar() {
    const { allUnits, handlePSearch, searchState, filteredUnits } = useContext(UserContext);
    
    return (
        <div className="filter-bar">
            <div className = "dropdown">
                <option>1</option>
                <option>1</option>
            </div>
        </div>
    )
    }

    export default FilterBar;
