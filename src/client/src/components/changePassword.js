import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import NavBar from './navbar';
import { confirmAlert } from 'react-confirm-alert';


class LoginUser extends Component {
    constructor() {
        super();
        this.state = {
            OldPassword: '',
            NewPassword: '',
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const user = {
            OldPassword: this.state.OldPassword,
            NewPassword: this.state.NewPassword,
        };
    console.log(user)
    axios
        .put(`http://localhost:8000/users/ChangePassword/${window.localStorage.getItem('USERID')}`, user)
        .then(res => {
            this.setState({
                OldPassword:'',
                Password: '',
            })
            confirmAlert({
              customUI: () => {
                  return (
                      <div>
                          <h1>Password Changed</h1>
                          <p align='center'>Success</p>
                      </div>
                  );
              },
              closeOnEscape: true,
              closeOnClickOutside: true,
          });
        })
        .then(data => {
        })
    };

    render() {
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
                  <h1 className="display-4 text-center">Change Password</h1>

                  <form noValidate onSubmit={this.onSubmit}>
                    <div className='form-group'>
                    <label htmlFor="OldPassword">Old Password</label>
                      <input
                        type='password'
                        name='OldPassword'
                        className='form-control'
                        value={this.state.OldPassword}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="NewPassword">New Password</label>
                      <input
                        type='password'
                        name='NewPassword'
                        className='form-control'
                        value={this.state.NewPassword}
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

export default LoginUser;