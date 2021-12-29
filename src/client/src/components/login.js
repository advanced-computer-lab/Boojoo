import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import NavBar from './navbar';
import ShowFlights from './showFlights';
import MainPage from './landingPage.js';


class LoginUser extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: '',
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
        };

      console.log(data)

      localStorage.setItem('email', data.Email)
    
    axios
        .post('http://localhost:8000/users/login', data)
        // .then(res => {
        //     this.setState({
        //         Email: '',
        //         Password: '',
        //     })
        //     //this.props.history.push('/');
        // })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('USERID', res.data._id)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isLoggedIn', 'true')
            console.log(res.data.message)
            if(res.data.message == "Valid admin password"){
              localStorage.setItem('admin', true)
            }
            else if(res.data.message == "Valid user password"){
              localStorage.setItem('admin', false)
            }
            else if(res.data.message == "Invalid Password"){
              alert("Invalid password")
            }
            else if(res.data.message =="User does not exist"){
              alert("User does not exist")
            }
            window.location.reload(false);
        })
    };

    render() {
      if(window.localStorage.getItem('token') != null){
        if(window.localStorage.getItem('admin') == 'true'){
          return(
            <Navigate to="/admin/view-flights"/>
          )
        }
        else{
          return(
            <Navigate to="/"/>
          )
        }
      }
      else{
        return (
          <div className="CreateBook">
            <NavBar/>
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Back
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Login</h1>
                  <p className="lead text-center">
                      Please enter your credentials
                  </p>

                  <form noValidate onSubmit={this.onSubmit}>
                    <div className='form-group'>
                    <label htmlFor="Email">Email</label>
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
    }

export default LoginUser;