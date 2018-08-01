import React, { Component } from 'react';

import {Button} from 'react-bootstrap';
import axios from 'axios';
import config from '../config';

const API_KEY = config.API_KEY;

class LocationForm extends Component {
    state = {
        addressLine1: '',
        addressLine2: '',
        zipcode: '',
        city: '',
        state: '',
        lat: '',
        lng: '',
        name: '',
        price_level: '',
        rating: '',
        photo: '',
        restaurants: [],
        place_id: '',
        spinDisabled: false,
        isFetching: false
    }

    setZipcode = e => {
        this.setState({ zipcode: e.target.value });
    }

    setCity = e => {
        this.setState({ city: e.target.value });
    }

    setFormState = e => {
        this.setState({ state: e.target.value });
    }

    setAddressLine1 = e => {
        this.setState({addressLine1: e.target.value})
    }

    setAddressLine2 = e => {
        this.setState({addressLine2: e.target.value})
    }

    handleRestaurantList = (resp, status, pagination) => {
        console.log(resp);
        this.setState({
            restaurant: this.state.restaurants.push(...resp)
        });
        const { restaurants } = this.state;
        let restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        this.setState({name: restaurant.name, place_id: restaurant.place_id});
        // if(pagination.hasNextPage) {
        //     pagination.nextPage();
        // } else { 
            const { lat, lng, addressLine1, addressLine2, zipcode, city, state } = this.state;
            this.setState({isFetching: false})
            this.props.history.push({
                pathname:`${process.env.PUBLIC_URL}/restaurants/${this.state.place_id}`,
                state: { 
                    startLocation: {lat, lng, addressLine1, addressLine2, zipcode, city, state }
                    
                }
            })
            // this.setState({isDoneFetching: true})
        // }
    }

    updateRestaurant = () => {
        const google = window.google;
        this.setState({isFetching: true})
        this.getLatLng().then(response => {
            console.log(response);
            if(response.data.results.length) { 
                this.setState({ ...response.data.results[0].geometry.location });
                const { lat, lng } = this.state;
                var loc = new google.maps.LatLng(lat, lng)
                var service = new google.maps.places.PlacesService(document.createElement('div'));
                var request = {
                    radius: '4828',
                    type: ['restaurant'],
                    location: loc
                };
                service.nearbySearch(request, this.handleRestaurantList);
            } else {
                this.setState({isFetching: false})
            //display error
            }
        });

    }


    getLatLng = () => {
        const { zipcode, addressLine1, addressLine2, city, state } = this.state;
        let param = `${addressLine1} ${addressLine2} ${zipcode} ${city} ${state}`;
        param = param.replace(/ /g, '+');
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${param}&key=${API_KEY}`);
    }

    navigateToPlace = props => {
        console.log(process.env.PUBLIC_URL)
        this.props.history.push(`${process.env.PUBLIC_URL}/restaurants/${this.state.place_id}`);
    }
    componentWillMount = () => {
        if(this.props.location.state && this.props.location.state.startLocation) {
            this.setState({...this.props.location.state.startLocation});
        }
    }
    render () {

        const { zipcode, addressLine1, addressLine2, city, state } = this.state;
        return (
            <div className="container">
        <form>
            <div className="row">
            <div className="col-xs-12">
                
            <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1:</label>
                <input id="addressLine1" type="text" className="form-control" value={addressLine1} onChange={this.setAddressLine1} maxLength="30"/>
            </div>
            <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2:</label>
                <input id="addressLine2" type="text" className="form-control" value={addressLine2} onChange={this.setAddressLine2} maxLength="30"/>
            </div>
            </div>
            </div>

            <div className="row form-group">
            <div className="col-xs-12 col-sm-5">
                <label htmlFor="city">City:</label>
                <input id="city" className="form-control" type="text" value={city}  onChange={this.setCity} maxLength="15"/>
            </div>
            <div className="col-xs-12 col-sm-2">
                <label htmlFor="state">State:</label>
                <input id="state" className="form-control" type="text" value={state}  onChange={this.setFormState} maxLength="2"/>
            </div>
            <div className="col-xs-12 col-sm-5">
                <label htmlFor="zipcode">Zipcode:</label>
                <input id="zipcode" className="form-control" type="text" value={zipcode}  onChange={this.setZipcode} maxLength="5"/>
            </div>
            </div>
            <Button bsStyle="primary" onClick={this.updateRestaurant} disabled={ this.state.isFetching }>Get Restaurant</Button>
            {/* {
                this.state.isDoneFetching
                &&
                this.navigateToPlace(this.props)
            } */}
        </form>
        </div>
        )
    }
}

export default LocationForm;