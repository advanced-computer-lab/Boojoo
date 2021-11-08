import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFlight from './components/createFlights';
import ShowFlights from './components/showFlights';
//import ShowBookDetails from './components/ShowBookDetails';
import UpdateFlight from './components/updateFlights';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<ShowFlights/>}/>
            <Route path='/create-flight' element={<CreateFlight/>} />
            <Route path='/edit-flight/:id' element={<UpdateFlight/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;