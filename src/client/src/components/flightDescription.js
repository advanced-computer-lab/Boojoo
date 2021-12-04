import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Select from "react-select";
import '../App.css';
import axios from 'axios';
import { useState } from "react";
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
        SeatNumber: window.localStorage.getItem('SELECTEDSEATS')
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
        .catch(err => {
            console.log("Error in Reserving flight");
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

const setId = (id) => {
    console.log(id)
    localStorage.setItem('ID', id);
}

class showFlightDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            flight: {},
        };
        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    handleMultiChange(option) {
        this.setState(state => {
            return {
                multiValue: option
            };
        });
        const selectedSeats = this.state.multiValue;
        console.log(selectedSeats)
    }

    onChange = (option) => {
        // option.value     -->  "chocolate"
        // option.label     -->  "Chocolate"
        // option.extraInfo -->  "A"
        return option;
        console.log(option)
      };
    
    componentDidMount() {
        const id = window.localStorage.getItem('ID')
        axios
            .get(`http://localhost:8000/flights/ViewDetails/${id}`)
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
        const x = window.localStorage.getItem('SEATSARRAY')
        const seatsArray = x.split(',')
        var seatsList = [];
        seatsArray.forEach(function(element) {
            seatsList.push({ label:element, value: element })
        });

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
            <td>
                <Select
                    isMulti
                    isSearchable={false}
                    name="seats"
                    options={seatsList}
                    className="basic-multi-select"
                    closeMenuOnSelect={false}
                    classNamePrefix="select"
                    onChange={this.onChange}
                />
            </td>
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
                        <Link to="/" className="btn btn-outline-warning float-left">
                            Flight List
                        </Link>
                    </div>
                    <br />
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Flight Details</h1>
                        <hr /> <br />
                    </div>
                </div>
                <div>
                    { FlightItem }
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-outline-info btn-lg btn-block" onClick={() => reservePopup(flight._id)}>Reserve Flight</button>
                        <br />
                    </div> 
                    <div className="col-md-6">
                        <Link to={`/viewReturnFlights/${flight._id}`} className="btn btn-outline-info btn-lg btn-block" onClick={() => setId(flight._id)}>
                            View Return Flights
                        </Link>
                        <br />
                    </div>
                </div> 

            </div>
        </div>
        </> 
    );
    }
}

export default showFlightDescription;