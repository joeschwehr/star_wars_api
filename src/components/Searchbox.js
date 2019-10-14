import React from "react";

const Searchbox = ({ searchChange }) => {
    return (
        <div className="pa2">
            <input 
                id="searchbox"
                className="pa2" 
                name="quantity" min="1" max="200"
                type="text" 
                placeholder="Filter by Name" 
                onChange={searchChange}/>
        </div>
    );
}

export default Searchbox;