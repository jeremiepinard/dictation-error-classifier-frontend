import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import DictationAnalysis from './components/DictationAnalysis'

class App extends Component {
    render() {
        let correctSpellings = ["bleauh", "allo"];
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <DictationAnalysis correctSpellings={correctSpellings}/>
            </div>
        );
    }
}

export default App;
