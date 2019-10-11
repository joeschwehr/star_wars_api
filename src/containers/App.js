import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/Searchbox";
import "./app.css"
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: "",
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        let numText = "";
        switch(filteredRobots.length){
            case 0: numText = "Zero";
                break;
            case 1: numText = "One";
                break;
            case 2: numText = "Two";
                break;
            case 3: numText = "Three";
                break;
            case 4: numText = "Four";
                break;
            case 5: numText = "Five";
                break;
            case 6: numText = "Six";
                break;
            case 7: numText = "Seven";
                break;
            case 8: numText = "Eight";
                break;
            case 9: numText = "Nine";
                break;
            case 10: numText = "Ten"
                break;
            default: numText = "";
        }

        let letter_s = "";
        switch(numText){
            case "One": letter_s = "";
                break;
            default: letter_s = "s";
        }

        if(!this.state.robots.length){
            return <h1>Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">{numText} Robofriend{letter_s}</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            )
        }

    }
}

export default App;