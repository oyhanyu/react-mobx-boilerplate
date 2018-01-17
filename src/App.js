import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'mobx-react';
import AppStore from './AppStore';
import './App.css';
import Home from './routes/Home/Home';
import Notfound from './routes/Error/404';

let routes = (
    <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route exact component={Notfound}></Route>
    </Switch>
);

class App extends Component {

    render() {
        return (
            <Provider {...AppStore}>
                <BrowserRouter>
                    {routes}
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;