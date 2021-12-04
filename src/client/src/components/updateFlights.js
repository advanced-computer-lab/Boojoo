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
      From:'',
      From:'',
      Date:'',
      Arrival:'',
      Departure:'',
      TripDuration:'',
      EcoSeats: Number,
      BusniessSeats: Number,
      Available:'',
      //SeatsArray:'[]',
      Price: Number,        
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
            From: res.data.From,
            To: res.data.To,
            Date: res.data.Date,
            Arrival: res.data.Arrival,
            Departure: res.data.Departure,
            TripDuration: res.data.TripDuration,
            EcoSeats: res.data.EcoSeats,
            BusniessSeats: res.data.BusniessSeats,
            Available: res.data.Available,
            Price: res.data.Price,
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
      From: this.state.From,
      To:this.state.To,
      Date: this.state.Date,
      Arrival: this.state.Arrival,
      Departure: this.state.Departure,
      TripDuration: this.state.TripDuration,
      EcoSeats: this.state.EcoSeats,
      BusniessSeats: this.state.BusniessSeats,
      Available: this.state.Available, 
      //SeatsArray: this.state.SeatsArray,
      Price: this.state.Price,
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
              <Link to="/admin/view-flights" className="btn btn-outline-warning float-left">
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
              <label htmlFor="Code">Flight Code</label>
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
                    <label htmlFor="title">From</label>
                      <input
                        type='text'
                        placeholder='From'
                        name='From'
                        className='form-control'
                        value={this.state.From}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">To</label>
                      <input
                        type='text'
                        placeholder='To'
                        name='To'
                        className='form-control'
                        value={this.state.To}
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
                    <label htmlFor="title">Duration</label>
                      <input
                        type='time'
                        placeholder='Trip Duration'
                        name='TripDuration'
                        className='form-control'
                        value={this.state.TripDuration}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Cabin Type</label>
                      <select 
                        name='Cabin'
                        className='form-control'
                        onChange={this.onChange}
                      >
                        <option value='Economy'>Economy</option>
                        <option value='Business'>Business</option>
                        <option value='First Class'>First Class</option>
                      </select>
                    </div>
    
                    <div className='form-group'>
                    <label htmlFor="title">Baggage</label>
                      <input
                        type='number'
                        placeholder='Baggage Size'
                        name='Baggage'
                        className='form-control'
                        value={this.state.Baggage}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Available</label>
                      <select 
                        name='Available'
                        className='form-control'
                        onChange={this.onChange}
                      >
                        <option value='true'>true</option>
                        <option value='false'>false</option>
                      </select>
                    </div>

                    <div className='form-group'>
                    <label htmlFor="title">Seats</label>
                      <input
                        type='number'
                        placeholder='Seats'
                        name='Seats'
                        className='form-control'
                        value={this.state.Seats}
                        onChange={this.onChange}
                      />
                    </div> 

                    <div className='form-group'>
                    <label htmlFor="title">Price</label>
                      <input
                        type='Number'
                        min="0.00" 
                        max="20000.00" 
                        //pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                        data-type="currency"
                        step="0.01"
                        placeholder='Price'
                        name='Price'
                        className='form-control'
                        value={this.state.Price}
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