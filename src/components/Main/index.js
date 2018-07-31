import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import LocationForm from '../LocationForm';
import RestaurantDetail from '../RestaurantDetail';
const baseUrl = process.env.PUBLIC_URL;
const Main = props => (
    <Switch>
        <Route exact path={baseUrl + "/"} render={props => 
            <div>
                <Header {...props}/>
                <LocationForm {...props}/>
            </div>
         } />
        <Route path={baseUrl + "/restaurants/:id"} render={props => 
            <div>
                <Header {...props}/>
                <RestaurantDetail {...props}/>
            </div>
         } />
    </Switch>
);

export default Main;