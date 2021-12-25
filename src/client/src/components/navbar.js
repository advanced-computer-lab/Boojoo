import React, {useState, useEffect, Component} from 'react';
import '../App.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function NavBar() {

    const [flightList, setFlightList] = useState([]);
    const [success, setSuccess ] = useState(true);

    useEffect(() =>{
        if(window.localStorage.getItem('token') !== null){
            setSuccess(false);
        }
    }, [])

    console.log(window.localStorage.getItem('token'))

    return (
        <Navbar sticky="top" bg="light" variant="light">
        <Navbar.Brand align="left" href="/">
            Boojoo's Flight Reservation System
        </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/reservations">Reservations</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
        <Navbar.Toggle /> 
        {success 
        ?
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <a href="/login">Login</a>
        </Navbar.Text>
        </Navbar.Collapse>
        :
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <a href={`/viewUser/${window.localStorage.getItem('USERID')}`}>User Profile</a>
        </Navbar.Text>
        </Navbar.Collapse>
        }   
    </Navbar>      
    );
}
