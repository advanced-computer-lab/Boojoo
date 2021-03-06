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
import { FieldVariable__Class } from 'blockly';

const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    })
  }

const reserveFlight = (id) => {
    //axios.post('http://localhost:8000/flights/ReserveFlight').then( () => {
        //window.location.reload(false);
    //})
    const seatNumberArray = window.localStorage.getItem('SELECTEDSEATS').split(',')
    if(seatNumberArray[0] == ''){
        alert('Please reserve an available seat')
        confirmAlert({
            customUI: () => {
                return (
                    <div>
                        <h1>Please select a seat </h1>
                        <p>Error</p>
                    </div>
                );
            },
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }
    else{
    console.log(seatNumberArray);
    const data = {
        Attendant: '61a7a3d32ecf681ee765d77e',
        Tickety: id,
        SeatNumber: seatNumberArray,
        Price: window.localStorage.getItem('PRICE')
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
            selectedOption: null,
            flight: {},
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        var x = [];
        var indexList = [];
        var i = 0;
        selectedOption.forEach(function(element) {
            x.push(selectedOption[i].value.split('Seat:'))
            indexList.push(x[i][1])
            i+=1;
        });
        console.log(x)
        console.log(indexList)
        localStorage.setItem('SELECTEDSEATS', indexList);
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
        const { selectedOption } = this.state;
        const flight = this.state.flight;

        localStorage.setItem('PRICE', flight.Price * (window.localStorage.getItem('SELECTEDSEATS').split(',').length));

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
                    styles={customStyles}
                    value={selectedOption}
                    options={seatsList}
                    className="basic-multi-select"
                    closeMenuOnSelect={false}
                    classNamePrefix="select"
                    onChange={this.handleChange}
                />
            </td>
        </tr>
        <tr>
            <td>Price:</td>
            <td>{ flight.Price * window.localStorage.getItem('SELECTEDSEATS').split(',').length }</td>
        </tr>
        </tbody>
        </table>
        </div>

    return (

        <>
        <Navbar sticky="top" bg="light" variant="light">
        <Navbar.Brand align="left" href="/">
           {/* <img
                alt=""
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
           />{' '} */}
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