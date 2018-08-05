import React, {Component} from 'react';
import './App.css';
import DictationAnalysis from "./components/DictationAnalysis";
import DictationPicker from "./components/DictationPicker";
import Heading from "./components/Heading";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Heading />
                        <Switch>
                            <Route path='/dictations' component={DictationPicker}/>
                            <Route path='/analyses?dictation=:id' component={DictationAnalysis}/>
                            {/* when none of the above match, <NoMatch> will be rendered */}
                            {/*<Route component={NoMatch}/>*/}
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
