import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/Searchbox";
import "./app.css"
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import RadioSelectors from "../components/RadioSelectors";

class App extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            searchfield: "",
            radioButton: "people",
            people: [],
            planets: [],
            starships: [],
            species: [],
            vehicles: [],
            films: [],
        }
    }

    async componentDidMount(){
        this.init();
    }
    
    async init(){   
        const urls = [
            'https://swapi.co/api/people/',
            'https://swapi.co/api/planets/',
            'https://swapi.co/api/starships/',
            'https://swapi.co/api/species/',
            'https://swapi.co/api/vehicles/',
            'https://swapi.co/api/films/'
            ]
            
        try {
            const [ people, planets, starships, species, vehicles, films ] = await Promise.all(urls.map(async function(url) {
                const response = await fetch(url);
                if (!response.ok) {
                    throw Error(response.statusText);
                    }
                let dataObject = await response.json();
                let dataArray = dataObject.results;
                const whileLoop = async _ => {                  
                    while (dataObject.next) {
                        const newResponse = await fetch(dataObject.next);
                        const newObject = await newResponse.json();

                        for(let i = 0; i < newObject.results.length; i++){
                            dataArray.push(newObject.results[i]);
                        }

                        dataObject = newObject;
                    }
                    return dataArray;
                  }
                const returnedArray = await whileLoop();
                return returnedArray;
            }));

            const sortData = (items) => {
                items.sort(function(a, b) {
                    return parseFloat(a.url.match(/[0-9]+/)[0]) - parseFloat(b.url.match(/[0-9]+/)[0]);
                });
                return items;
            }
            
            this.setState({people: sortData(people)});
            this.setState({planets: sortData(planets)});
            this.setState({species: sortData(species)});
            this.setState({starships: sortData(starships)});
            this.setState({vehicles: sortData(vehicles)});
            this.setState({films: sortData(films)});

            this.setState({ data: people});
        } catch (err) {
            console.log('Error in INIT: ', err);
        }
    };

    async deepFetch(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
            }
        const dataObject = await response.json();
        const nextPage = async function() {
            if (dataObject.next) {
            return await fetch(dataObject.next);
        }}
        return dataObject.results + nextPage;
    };

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }

    onRadioChange = (event) => {
        this.setState({ radioButton: event.target.value});
        switch(event.target.value){
            case "people":
                this.setState({ data: this.state.people});      
                break; 
            case "planets":
                this.setState({ data: this.state.planets});      
                break; 
            case "starships":
                this.setState({ data: this.state.starships});      
                break; 
            case "species":
                    this.setState({ data: this.state.species});      
                    break; 
            case "vehicles":
                this.setState({ data: this.state.vehicles});      
                break; 
            case "films":
                this.setState({ data: this.state.films});      
                break;                                
            default:
                this.setState({ data: this.state.people});      
        }
        this.clearSearchBox();
    }

    clearSearchBox = () => {
        const searchbox = document.getElementById("searchbox");
        if(searchbox){
            searchbox.value = "";
        }
        this.setState({searchfield: ""});
    }
    
    render() {     
        const filteredData = this.state.data.filter( item => {
            return item[Object.keys(this.state.data[0])[0]].toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        if(this.state.data.length){
            return (
                <div className="tc">
                    <h1 className="f1">Star Data</h1>
    
                    <RadioSelectors radioChange={this.onRadioChange} 
                                    peopleLen={this.state.people.length}
                                    planetsLen={this.state.planets.length}
                                    starshipsLen={this.state.starships.length}
                                    speciesLen={this.state.species.length}
                                    vehiclesLen={this.state.vehicles.length}
                                    filmsLen={this.state.films.length}
                                    />
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList   data={filteredData} 
                                        radioButton={this.state.radioButton}
                                        peopleDatabase={this.state.people}
                                        planetsDatabase={this.state.planets}
                                        starshipsDatabase={this.state.starships}
                                        speciesDatabase={this.state.species}
                                        vehiclesDatabase={this.state.vehicles}
                                        filmsDatabase={this.state.films} />
                        </ErrorBoundary>  
                    </Scroll>
                    <footer>
                        <p>All data is from <a href="https://swapi.co" target="blank">www.swapi.com</a></p>
                    </footer>
                </div>
            )  
        } else { 
            return(
                <div className="tc">
                    <h1 className="f1">Star Data</h1>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList   data={filteredData} 
                                        radioButton={this.state.radioButton}
                                        peopleDatabase={this.state.people}
                                        planetsDatabase={this.state.planets}
                                        starshipsDatabase={this.state.starships}
                                        speciesDatabase={this.state.species}
                                        vehiclesDatabase={this.state.vehicles}
                                        filmsDatabase={this.state.films} />
                        </ErrorBoundary>  
                    </Scroll>
                </div>
            )

        }
    }
}

export default App;