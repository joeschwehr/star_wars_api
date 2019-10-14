import React from "react";
import Card from "./Card";

const Cardlist = ({ data, radioButton, peopleDatabase, planetsDatabase, speciesDatabase, filmsDatabase }) => {
    
    function convertToIndexedDict(dataBase, name="name"){
        //transforming the API database into a keyed object {urlNumber: Name of Item} // Ex: {1: Human}
        //Films DB doesn't use "name", but "title"
        const arrayOfItems = dataBase.map(record => {
            const newArray = [record.url.match(/[0-9]+/)[0], record[name]];
            return newArray;
        });
        return Object.fromEntries(arrayOfItems);
    }

    function queryDatabase(database, categoricalIndexName, item, notFoundValue="Unknown"){
        let itemAttribute = notFoundValue;
        let url = "";

        //if item.url is a list, vs if item.url is a string
        if(item[categoricalIndexName] instanceof Array){
            url = item[categoricalIndexName][0];
        } else{
            url = item[categoricalIndexName];
        }

        if(url){
            let itemIndex = url.match(/[0-9]+/)[0];
            itemAttribute = database[itemIndex];
        } 
        return itemAttribute;
    }

    function getArrayFromDB(dictionary, item, search){
        const returnedArray = item[search].map(url => {
            if(url){
                return [dictionary[url.match(/[0-9]+/)[0]], url.match(/[0-9]+/)[0]];
            } else{
                return "n/a";
            }
        });
        
        //sort array
        const sorted = returnedArray.sort(function(a, b) {
            return parseFloat(a[1]) - parseFloat(b[1]);
        });

        return sorted.map(item => item[0]);
    }

    //convert the orginal arrays to dicts with proper indexs based number at end of url (swapi.co/person/1/)
    // (the api indexs for people skip a person)
    const speciesDict = convertToIndexedDict(speciesDatabase);
    const planetsDict = convertToIndexedDict(planetsDatabase);
    const charactersDict = convertToIndexedDict(peopleDatabase);
    const filmsDict = convertToIndexedDict(filmsDatabase, "title");

    if(data.length > 0){
        return (
            <div>
                {                            
                data.map((item) => {
                    if(radioButton === "people"){

                        const personSpecies = queryDatabase(speciesDict, "species", item);
                        const personHomeWorld = queryDatabase(planetsDict, "homeworld", item);
                        const filmsArray = getArrayFromDB(filmsDict, item, "films");
                        const height = item.height + " cm";
                        const mass = item.mass + " kg";

                        return(
                            <Card key={item.name} name={item.name} 
                            label1={"Species: "} attribute1={personSpecies}
                            label2={"Home World: "} attribute2={personHomeWorld}
                            label2a={"Height: "} attribute2a={height}
                            label3={"Mass: "} attribute3={mass}
                            label4={"Films: "} attribute4={filmsArray.join(", ")}
                            radioButton={radioButton}
                            />
                        )
                    } else if (radioButton === "planets") {
                        const residentsArray = getArrayFromDB(charactersDict, item, "residents");
                        const filmsArray = getArrayFromDB(filmsDict, item, "films");
                        const orbital_period = item.orbital_period + " days";
                        const rotation_period = item.rotation_period + " hours";
                        return(
                            <Card key={item.name} name={item.name} 
                            label1={"Gravity: "} attribute1={item.gravity}
                            label2={"Climate: "} attribute2={item.climate}
                            label2a={"Orbital Period: "} attribute2a={orbital_period}
                            label2b={"Rotation Period: "} attribute2b={rotation_period}
                            label2c={"Population: "} attribute2c={item.population}
                            label3={"Residents: "} attribute3={residentsArray.join(", ")}
                            label4={"Films: "} attribute4={filmsArray.join(", ")}
                            radioButton={radioButton}
                            />
                        )
                    } else if (radioButton === "starships") {
                        const filmsArray = getArrayFromDB(filmsDict, item, "films");
                        return(
                            <Card key={item.name} name={item.name} 
                            label1={"Max Speed: "} attribute1={item.max_atmosphering_speed}
                            label2={"Crew: "} attribute2={item.crew}
                            label2a={"Passengers: "} attribute2a={item.passengers}
                            label2b={"Hyperdrive Rating: "} attribute2b={item.hyperdrive_rating}
                            label3={"Class: "} attribute3={item.starship_class}
                            label4={"Films: "} attribute4={filmsArray.join(", ")}
                            radioButton={radioButton}
                            />
                        )
                    } else if (radioButton === "species") {

                        const peopleArray = getArrayFromDB(charactersDict, item, "people");
                        const homeWorld = queryDatabase(planetsDict, "homeworld", item, "n/a");
                        const filmsArray = getArrayFromDB(filmsDict, item, "films");

                        return(
                            <Card key={item.name} name={item.name} 
                            label1={"Classification: "} attribute1={item.classification}
                            label2={"Average Lifespan: "} attribute2={item.average_lifespan}
                            label2a={"Average Height: "} attribute2a={item.average_height}
                            label2b={"Skin Colors: "} attribute2b={item.skin_colors}
                            label2c={"Eye Colors: "} attribute2c={item.eye_colors}
                            label2d={"Home World: "} attribute2d={homeWorld}
                            label3={"People: "} attribute3={peopleArray.join(", ")}
                            label4={"Films: "} attribute4={filmsArray.join(", ")}
                            radioButton={radioButton}
                            />
                        )
                    } else if (radioButton === "vehicles") {

                        const filmsArray = getArrayFromDB(filmsDict, item, "films");

                        return(
                            <Card key={item.name} name={item.name} 
                            label1={"Class: "} attribute1={item.vehicle_class}
                            label2={"Crew: "} attribute2={item.crew}
                            label2a={"Passengers: "} attribute2a={item.passengers}
                            label2b={"Model: "} attribute2b={item.model}
                            label2c={"Length: "} attribute2c={item.length}
                            label3={"Max Speed: "} attribute3={item.max_atmosphering_speed}
                            label4={"Films: "} attribute4={filmsArray.join(", ")}
                            radioButton={radioButton}
                            />
                        )
                    } else { //radioButton === "films"

                        const filmCharacters = getArrayFromDB(charactersDict, item, "characters");
                        const openingCrawl = item.opening_crawl;

                        return (
                            <Card key={item.title} name={item.title} 
                                label1={"Release Date: "} attribute1={item.release_date}
                                label2={"Directed by: "} attribute2={item.director}
                                label3={"Produced by: "} attribute3={item.producer}
                                label4={"Characters: "} attribute4={filmCharacters.join(", ")}
                                label5={"Opening Crawl: "} attribute5={openingCrawl}

                                radioButton={radioButton}
                                />
                        );
                    }
                })
                }
            </div>
        );
    } else {
            return (
            <div>
                {                            
                    <Card key={data.name} 
                        name={data.name} 
                        />
                }
            </div>
        )};
}

export default Cardlist; 