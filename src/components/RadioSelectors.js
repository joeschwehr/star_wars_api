import React from "react";

const RadioSelectors = ({radioChange, peopleLen, planetsLen, starshipsLen, speciesLen, vehiclesLen, filmsLen}) => {
    return (
        <div className="">
            <label className="container">
                {peopleLen} People 
                <input type="radio" defaultChecked="checked" name="radio" value="people" onChange={radioChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">
                {planetsLen} Planets
                <input type="radio" name="radio" value="planets" onChange={radioChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">
                {starshipsLen} Starships
                <input type="radio" name="radio" value="starships" onChange={radioChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">
                {speciesLen} Species
                <input type="radio" name="radio" value="species" onChange={radioChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">
                {vehiclesLen} Vehicles
                <input type="radio" name="radio" value="vehicles" onChange={radioChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="container">
                {filmsLen} Films
                <input type="radio" name="radio" value="films" onChange={radioChange} />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}

export default RadioSelectors;