import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import './Header.css';

class Header extends Component {
    navigateHome = (state) =>{
        this.props.history.push({
            pathname:`/`,
            state: { startLocation: state.startLocation}
        })
    }
    render() {
    const {location} = this.props
    var address;
    if(location.state && location.state.startLocation){
        const { addressLine1, addressLine2, zipcode, city, state } = location.state.startLocation;
        address =  addressLine1 || addressLine2 || city || state || zipcode;
    }
    return (
    <div>
    <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
        <Navbar.Brand>
            <a onClick={() => this.navigateHome(location.state)}>Restaurant Roulette</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
        {/* <Nav>
            <NavItem eventKey={1} href="#">
            Link
            </NavItem>
            <NavItem eventKey={2} href="#">
            Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
        </Nav> */}
        <Nav pullRight>
            {   address &&
                <NavItem eventKey={2} onClick={() => this.navigateHome(location.state)}>
                    My Address: { address }
                </NavItem>
            }
        </Nav>
        </Navbar.Collapse>
    </Navbar>

    </div>
    )}
}

export default Header;