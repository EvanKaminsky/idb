import React from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

export default class TipsyNavbar extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>

                <Navbar.Header>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/">
                            <NavItem eventKey={1}>Home</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/cocktails">
                            <NavItem eventKey={2}>Cocktails</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/ingredients">
                            <NavItem eventKey={3}>Ingredients</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/brands">
                            <NavItem eventKey={4}>Brands</NavItem>
                        </LinkContainer>

                         <LinkContainer to="/about">
                            <NavItem eventKey={5}>About</NavItem>
                         </LinkContainer>
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        )
    }
}

