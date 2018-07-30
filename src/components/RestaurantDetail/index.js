import React, {Component} from 'react';

import FontAwesome from 'react-fontawesome';
import './RestaurantDetail.css';
// import {Button} from 'react-bootstrap'; import axios from 'axios'; const

function getPriceLevel(price) {
    return price ? '$'.repeat(price + 1) : 'N/A';
}

function getRating(rating) {
    let stars = [];
    for(let i = 0; i < 5; i++) { 
        if(i <= rating-1) {
            stars.push(<FontAwesome className="checked" name='star'/>)
        } else {
                stars.push(<FontAwesome name='star'/>)
        }
    }
    return stars;
}

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
        formatted_address: '',
        formatted_phone_number: '',
        rating: '',
        hours: '',
        photo_source: '',
        location: undefined,
        restaurants: [],
        spinDisabled: false,
        isFetching: false
    }

    handleDetails = (place, status) => {
        if (status === 'OK') {
            let {name, price_level, rating, photos, opening_hours, formatted_address, formatted_phone_number} = place;
            let location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
            console.log(place);
            let photoUrl = photos.length
                ? photos[0].getUrl({'maxWidth': 1200, 'maxHeight': 675})
                : '';

            if(opening_hours && opening_hours.weekday_text) {
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let day = days[new Date().getDay()];
                let hours = opening_hours.weekday_text.filter((value) => {
                    return value.includes(day);
                });
                this.setState({opening_hours: hours[0].slice(hours[0].indexOf(':')+2)})
            }
            this.setState({name, price_level, rating, location, photo_source: photoUrl, formatted_phone_number, formatted_address})
        }
    }

    getDetails() {
        const google = window.google;
        const {id} = this.props.match.params;
        var request = {
            placeId: id,
            fields: [
                'name',
                'rating',
                'opening_hours',
                'formatted_phone_number',
                'formatted_address',
                'geometry',
                'price_level',
                'photos'
            ]
        };

        var service = new google
            .maps
            .places
            .PlacesService(document.createElement('div'));
        service.getDetails(request, this.handleDetails);
    }
    renderMap = () => {
        const google = window.google;
        let map = new google.maps.Map(document.getElementById('map'), {
                        center: this.state.location,
                        zoom: 20
                        })
        if( this.props.location.state.startLocation ) {
            const {lat, lng} = this.props.history.location.state.startLocation;
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            let startLocation = new google.maps.LatLng(lat, lng)
            var request = {
                origin: startLocation,
                destination: this.state.location,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function(result, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(result);
                }
            });
        }
    }

    componentDidMount() {
        this.getDetails();
    }

    render() {
        const {name, rating, price_level, location, photo_source, opening_hours, formatted_address, formatted_phone_number} = this.state;
        return (
            <div className="container text-center">
               
                <h1>{name}</h1>
                {
                    photo_source 
                    && 
                    <div className="col-xs-12 ">
                        <img src={photo_source} alt={name} style={{"maxHeight": '100%', "maxWidth": '100%'}}/>
                    </div>
                }

                <div className="row">
                    <div className="col-xs-6 col-sm-4">
                        <p className="h3">Phone</p >
                        <p>{formatted_phone_number}</p>
                        
                    </div>
                    <div className="col-xs-6 col-sm-4 star-rating">
                                                <p className="h3">Address</p >
                        <p>{formatted_address}</p>
                        
                    </div>
                    {   opening_hours &&
                    <div className="col-xs-6 col-sm-4 ">
                        <p className="h3">Hours</p >
                        <p>{opening_hours}</p>
                    </div>
                    }
                    <div className="col-xs-6 col-sm-6 ">
                        <p className="h3">Price</p>
                        <p>{price_level && getPriceLevel(price_level)}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <p className="h3">Rating</p >
                        <p className>{rating && getRating(rating)}</p>
                    </div>
                </div>
                <div className="row">
                <div id="map" className="col-xs-12"></div>
                {  typeof location === 'object' && this.renderMap()
                }
                </div>
                
            </div>
        )
    }
}

export default LocationForm;