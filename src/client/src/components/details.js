import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NavBar from './navbar';

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
    

    
    componentDidMount() {
        const id = window.localStorage.getItem('IDDETAILS')
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
        </tbody>
        </table>
        </div>

    return (

        <>
        <NavBar/> 

        <div className="ShowBookDetails">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <br /> <br />
                        <Link to="/reservations" className="btn btn-outline-warning float-left">
                            back
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
            </div>
            <div  className="col-md-6 m-auto">
                        <Link to={`/viewReturnFlights/${flight._id}`} className="btn btn-outline-info btn-lg btn-block" onClick={() => setId(flight._id)}>
                            View Return Flights
                        </Link>
                        <br />
            </div>
        </div>
        </> 
    );
    }
}

export default showFlightDescription;