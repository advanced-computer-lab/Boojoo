import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateFlight from './components/createFlights';
import ShowFlights from './components/showFlights';
import UpdateFlight from './components/updateFlights';
import FlightDescription from './components/flightDescription'
import MainPage from './components/landingPage.js';
import ReservationPage from './components/userReservations';
import ViewUser from './components/viewUser';
import EditUser from './components/editUser';
import ViewReturnFlights from './components/viewReturnFlights'
import ReturnFlightDescription from './components/returnFlightDescription'
import Details from './components/details'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<MainPage/>}/>
            <Route exact path='/details/:id' element={<Details/>}/>
            <Route exact path='/returnFlightDescription/:id' element={<ReturnFlightDescription/>}/>
            <Route exact path='/viewUser' element={<ViewUser/>}/>
            <Route exact path='/viewReturnFlights/:id' element={<ViewReturnFlights/>}/>
            <Route exact path='/editUser/:id' element={<EditUser/>}/>
            <Route exact path='/reservations' element={<ReservationPage/>}/>
            <Route exact path='/flightDescription/:id' element={<FlightDescription/>}/>
            <Route exact path='/admin/view-flights' element={<ShowFlights/>}/>
            <Route path='/admin/create-flight' element={<CreateFlight/>} />
            <Route path='/admin/edit-flight/:id' element={<UpdateFlight/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;