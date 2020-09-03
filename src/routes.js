import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Characters from './pages/Characters';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/characters" exact component={Characters} />
                
            </Switch>
        </BrowserRouter>
    );
}