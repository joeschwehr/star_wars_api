import React, { Component } from "react";
import Card from "../components/Card";
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

        if(!this.state.robots.length){
            return <h1>Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">Star Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <Card name="jimmy" email="eee" id="idddd"/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            )
        }

    }
}

export default App;