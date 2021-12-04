import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const reserveFlight = (id) => {
    //axios.post('http://localhost:8000/flights/ReserveFlight').then( () => {
        //window.location.reload(false);
    //})
    const seats = window.localStorage.getItem('SEATS')
    const data = {
        Attendant: '61a7a3d32ecf681ee765d77e',
        Tickety: id,
        SeatNumber: seats
    };

    console.log(data);

    axios
        .post(`http://localhost:8000/flights/ReserveFlight/${id}`, data)
        .then(res => {
            confirmAlert({
                customUI: () => {
                    return (
                        <div>
                            <h1>Flight Reserved</h1>
                            <p align='center'>Success</p>
                        </div>
                    );
                },
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
            
        })
}

const reservePopup = _id => {
    confirmAlert({
        title: "Reserve Flight",
        message: "Are you sure you want to reserve this flight?",
        buttons: [
            {
                label: "Yes",
                onClick: () => reserveFlight(_id)
            },
            {
                label: "No",
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
    });
}

class showReturnFlightDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flight: {}
        };
    }



    componentDidMount() {
        const idReturn = window.localStorage.getItem('RETURNID')
        axios
            .get(`http://localhost:8000/flights/ViewDetails/${idReturn}`)
            .then(res => {
                this.setState({
                    flight: res.data
                })
            })
            .catch(err => {
                console.log("Error from flightDescription");
            })
    };
    


    render() {

        const flight = this.state.flight;
        localStorage.setItem('SEATS', flight.Seats);
        console.log(flight.Seats)
        let FlightItem = <div>
        <table className="table table-hover table-dark">
        <tbody>
        <tr>
            <td>Flight Code:</td>
            <td>{ flight.Code }</td>
        </tr>
        <tr>
            <td>Airport:</td>
            <td>{ flight.Airport }</td>
        </tr>
        <tr>
            <td>Terminal:</td>
            <td>{ flight.Terminal }</td>
        </tr>
        <tr>
            <td>From:</td>
            <td>{ flight.From }</td>
        </tr>
        <tr>
            <td>To:</td>
            <td>{ flight.To }</td>
        </tr>
        <tr>
            <td>Date:</td>
            <td>{ flight.Date }</td>
        </tr>
        <tr>
            <td>Arrival Time:</td>
            <td>{ flight.Arrival }</td>
        </tr>
        <tr>
            <td>Departure Time:</td>
            <td>{ flight.Departure }</td>
        </tr>
        <tr>
            <td>Trip Duration:</td>
            <td>{ flight.TripDuration }</td>
        </tr>
        <tr>
            <td>Cabin Type:</td>
            <td>{ flight.Cabin }</td>
        </tr>
        <tr>
            <td>Baggage:</td>
            <td>{ flight.Baggage }</td>
        </tr>
        <tr>
            <td>Available:</td>
            <td>{ flight.Available }</td>
        </tr>
        <tr>
            <td>Seats:</td>
            <td>{ flight.Seats }</td>
        </tr>
        <tr>
            <td>Price:</td>
            <td>{ flight.Price }</td>
        </tr>
        </tbody>
        </table>
        </div>

    return (

        <>
        <Navbar sticky="top" bg="light" variant="light">
            <Navbar.Brand align="left" href="/">
                <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Boojoo's Flight Reservation System
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/reservations">Reservations</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <a href="/viewUser">User Profile</a>
            </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>

        <div className="ShowBookDetails">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <br /> <br />
                        <Link to={`/viewReturnFlights/${window.localStorage.getItem('ID')}`} className="btn btn-outline-warning float-left">
                            Return Flight List
                        </Link>
                    </div>
                    <br />
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Return Flight Details</h1>
                        <hr /> <br />
                    </div>
                </div>
                <div>
                    { FlightItem }
                </div>

                <div>
                    <div align="center">
                        <button className="btn btn-outline-info btn-lg btn-block" onClick={() => reservePopup(flight._id)}>Reserve Flight</button>
                        <br />
                    </div> 
                </div> 

            </div>
        </div>
        </> 
    );
    }
}

export default showReturnFlightDescription;