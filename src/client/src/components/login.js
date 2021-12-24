import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';


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
            localStorage.setItem('token', res.data.token)
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

export default LoginUser;