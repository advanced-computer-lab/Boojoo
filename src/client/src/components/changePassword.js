import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


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
        .put('http://localhost:8000/users/ChangePassword/61c5f708377781808aad5894', user)
        .then(res => {
            this.setState({
                OldPassword:'',
                Password: '',
            })
            //this.props.history.push('/');
        })
        .then(data => {
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
                  <h1 className="display-4 text-center">Login</h1>
                  <p className="lead text-center">
                      Please enter your credentials
                  </p>

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