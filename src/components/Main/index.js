import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import LocationForm from '../LocationForm';
import RestaurantDetail from '../RestaurantDetail';

const Main = props => (
    <Switch>
        <Route exact path="/" render={props => 
            <div>
                <Header {...props}/>
                <LocationForm {...props}/>
            </div>
         } />
        <Route path="/restaurants/:id" render={props => 
            <div>
                <Header {...props}/>
                <RestaurantDetail {...props}/>
            </div>
         } />
    </Switch>
);

export default Main;