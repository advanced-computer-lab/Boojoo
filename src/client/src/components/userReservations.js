import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ReservationCard from './reservationCard';

class ShowReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    };
  }


  componentDidMount() {
    axios
      .get('http://localhost:8000/flights/viewReservations')
      .then(res => {
        this.setState({
          reservations: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowReservationList');
      })
  };


  render() {
    const reservations = this.state.reservations;
    let reservationList;

    if(!reservations) {
        reservationList = "there is no book record!";
    } else {
        reservationList = reservations.map((reservation, k) =>
            <ReservationCard reservation={reservation} key={k} />
      );
    }

    if(window.localStorage.getItem('ISDELETED') == true){
      window.location.reload(false);
      localStorage.setItem('ISDELETED', false);
      console.log()
    }


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
    
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Reserved Flights</h2>
            </div>

          </div>

          <div className="list">
                {reservationList}
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default ShowReservationList;