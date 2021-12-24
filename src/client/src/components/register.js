import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Form from 'react-bootstrap/Form';


class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: '',
            PassportNumber: Number,
            FirstName: '',
            LastName:'',
            Address:'',
            CountryCode:'',
            Telephone: Number,       
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            Email: this.state.Email,
            Password: this.state.Password,
            PassportNumber: this.state.PassportNumber,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Address: this.state.Address,
            CountryCode: this.state.CountryCode,
            Telephone: this.state.Telephone,  
        };

    axios
        .post('http://localhost:8000/users/register', data)
        .then(res => {
            this.setState({
                Email: '',
                Password: '',
                PassportNumber: '',
                FirstName: '',
                LastName:'',
                Address:'',
                CountryCode:'',
                Telephone: '', 
            })
            this.props.history.push("/");
            confirmAlert({
              customUI: () => {
                  return (
                      <div>
                          <h1>Register</h1>
                          <p align='center'>Success</p>
                      </div>
                  );
              },
              closeOnEscape: true,
              closeOnClickOutside: true,
          });
        })
        .catch(err => {
            console.log("Error in registering");
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
                      Back
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Register</h1>
                  <p className="lead text-center">
                      Please enter your credentials
                  </p>
    
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className='form-group'>
                    <label htmlFor="FirstName">First Name</label>
                      <input
                        type='text'
                        placeholder='e.g: Mohamed'
                        name='FirstName'
                        className='form-control'
                        value={this.state.FirstName}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="LastName">Last Name</label>
                      <input
                        type='text'
                        placeholder='e.g: Omar'
                        name='LastName'
                        className='form-control'
                        value={this.state.LastName}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="Email">Email *</label>
                      <input
                        type='text'
                        placeholder='e.g: mohamed@gmail.com'
                        name='Email'
                        className='form-control'
                        value={this.state.Email}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="Address">Address</label>
                      <input
                        type='text'
                        placeholder='Country-City-District'
                        name='Address'
                        className='form-control'
                        value={this.state.Address}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="CountryCode">Country Code</label>
                      <input
                        type='number'
                        placeholder='21500'
                        name='CountryCode'
                        className='form-control'
                        value={this.state.CountryCode}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="Telephone">Telephone</label>
                      <input
                        type='number'
                        placeholder='01006688006'
                        name='Telephone'
                        className='form-control'
                        value={this.state.Telephone}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="PassportNumber">Passport Number</label>
                      <input
                        type='number'
                        placeholder='123412341234'
                        name='PassportNumber'
                        className='form-control'
                        value={this.state.PassportNumber}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="Password">Password</label>
                      <input
                        type='password'
                        name='Password'
                        className='form-control'
                        value={this.state.Password}
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

export default RegisterUser;