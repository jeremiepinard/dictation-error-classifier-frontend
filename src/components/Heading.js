import React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Heading  = () => (
    <Navbar>
            <Navbar.Brand>Dictation Error Classifier</Navbar.Brand>
        <Nav>
            <LinkContainer to="/dictations">
                <NavItem>Dictations</NavItem>
            </LinkContainer>
            <LinkContainer to="/rules">
                <NavItem>Rules</NavItem>
            </LinkContainer>
        </Nav>
    </Navbar>
);

export default Heading ;
