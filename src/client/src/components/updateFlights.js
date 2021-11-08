import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateFlight extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8000/users/:Email/ViewAllFlights')
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
            Code: res.data.Code,
            Airport: res.data.Airport,
            Terminal: res.data.Terminal,
            Date: res.data.Date,
            Arrival: res.data.Arrival,
            Departure: res.data.Departure,
            EcoSeats: res.data.EcoSeats,
            BusniessSeats: res.data.BusniessSeats,
            Available: res.data.Available,
        })
      })
      .catch(err => {
        console.log("Error error updating flight");
      })


  };

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

        const id = window.localStorage.getItem('ID')
        console.log(id);
        console.log(data)
        axios
        .put(`http://localhost:8000/users/:Email/UpdateFlight/${id}`, data)
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => {
          console.log("Error in Updating flight");
        })
};


  render() {
    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show All Flights
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Flight</h1>
              <p className="lead text-center">
                  Update Flight's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="code">Flight Code</label>
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
                    <label htmlFor="Airport">Airport</label>
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
                    <label htmlFor="Terminal">Terminal</label>
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
                    <label htmlFor="Date">Date</label>
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
                    <label htmlFor="Arrival">Arrival Time</label>
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
                    <label htmlFor="Departure">Departure</label>
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
                    <label htmlFor="EconomySeats">Economy Seats</label>
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
                    <label htmlFor="BusinessSeats">Business Seats</label>
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
                    <label htmlFor="Available">Available</label>
                      <input
                        type='text'
                        placeholder='Available?'
                        name='Available'
                        className='form-control'
                        value={this.state.Available}
                        onChange={this.onChange}
                      />
                    </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Flight</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateFlight;