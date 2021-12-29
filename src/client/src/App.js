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
import Login from './components/login';
import Register from './components/register'
import EditFlight from './components/editFlight'
import ChangePassword from './components/changePassword'
import StripeContainer from './components/StripeContainer'
import ChangeFlight from './components/ChangeFlight'
import EditFlightDetails from './components/editFlightDetails'
import FlightDescriptionUser from './components/flightDescriptionUser'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<MainPage/>}/>
            <Route exact path='/editFlightDetails/:id' element={<EditFlightDetails/>}/>
            <Route exact path='/ChangeFlight' element={<ChangeFlight/>}/>
            <Route exact path='/payment' element={<StripeContainer/>}/>
            <Route exact path='/changePassword' element={<ChangePassword/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/editFlight/:id' element={<EditFlight/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/details/:id' element={<Details/>}/>
            <Route exact path='/returnFlightDescription/:id' element={<ReturnFlightDescription/>}/>
            <Route exact path='/viewUser/:id' element={<ViewUser/>}/>
            <Route exact path='/viewReturnFlights/:id' element={<ViewReturnFlights/>}/>
            <Route exact path='/editUser/:id' element={<EditUser/>}/>
            <Route exact path='/reservations' element={<ReservationPage/>}/>
            <Route exact path='/flightDescription/:id' element={<FlightDescription/>}/>
            <Route exact path='/flightDescriptionUser/:id' element={<FlightDescriptionUser/>}/>
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