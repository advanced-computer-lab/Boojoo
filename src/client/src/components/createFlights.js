import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
            Code: '',
            Airport: '',
            Terminal: Number,
            Date:'',
            Arrival:'',
            Departure:'',
            EcoSeats: Number,
            BusniessSeats: Number,
            Available:'',        
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            Code: this.state.Code,
            Airport: this.state.Airport,
            Terminal: this.state.Terminal,
            Date: this.state.Date,
            Arrival: this.state.Arrival,
            Departure: this.state.Departure,
            EcoSeats: this.state.EcoSeats,
            BusniessSeats: this.state.BusniessSeats,
            Available: this.state.Available, 
        };

    axios
        .post('http://localhost:8000/users/:Email/CreateFlight', data)
        .then(res => {
            this.setState({
                Code: '',
                Airport: '',
                Terminal: Number,
                Date:'',
                Arrival:'',
                Departure:'',
                EcoSeats: Number,
                BusniessSeats: Number,
                Available:'', 
            })
            this.props.history.push('/');
        })
        .catch(err => {
            console.log("Error in creating flight");
        })
    };

    render() {
        return (
          <div className="CreateBook">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Show All Flights
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add Flight</h1>
                  <p className="lead text-center">
                      Create new flight
                  </p>
    
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className='form-group'>
                    <label htmlFor="title">Flight Code</label>
                      <input
                        type='text'
                        placeholder='Flight Code'
                        name='Code'
                        className='form-control'
                        value={this.state.Code}
                        onChange={this.onChange}
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                    <label htmlFor="title">Airport</label>
                      <input
                        type='text'
                        placeholder='Airport'
                        name='Airport'
                        className='form-control'
                        value={this.state.Airport}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                    <label htmlFor="title">Terminal</label>
                      <input
                        type='number'
                        placeholder='Terminal'
                        name='Terminal'
                        className='form-control'
                        value={this.state.Terminal}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Date</label>
                      <input
                        type='date'
                        placeholder='Date'
                        name='Date'
                        className='form-control'
                        value={this.state.Date}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Arrival Time</label>
                      <input
                        type='time'
                        placeholder='Arrival Time'
                        name='Arrival'
                        className='form-control'
                        value={this.state.Arrival}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Departure</label>
                      <input
                        type='time'
                        placeholder='Departure Time'
                        name='Departure'
                        className='form-control'
                        value={this.state.Departure}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                    <label htmlFor="title">Economy Seats</label>
                      <input
                        type='number'
                        placeholder='Number of economy seats'
                        name='EcoSeats'
                        className='form-control'
                        value={this.state.EcoSeats}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                    <label htmlFor="title">Business Seats</label>
                      <input
                        type='number'
                        placeholder='Number of busniess seats'
                        name='BusniessSeats'
                        className='form-control'
                        value={this.state.BusniessSeats}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Available</label>
                      <input
                        type='text'
                        placeholder='Available?'
                        name='Available'
                        className='form-control'
                        value={this.state.Available}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>
              </div>
            </div>
          </div>
        );
      }
    }

export default CreateFlight;