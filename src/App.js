import React, {Component} from 'react';
import './App.css';
import Router from "./components/Router";
import Highlight from 'highlight.js'

const limit = 2

class App extends Component {
    render() {
        return (
            <div className="container">
                <Router/>
            </div>
        );
    }
}

export default App;
