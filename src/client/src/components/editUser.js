import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      PassportNumber: '',
      Email:'',        
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/users/ViewUser/61a7a3d32ecf681ee765d77e')
      .then(res => {
        this.setState({
            FirstName: res.data.FirstName,
            LastName: res.data.LastName,
            PassportNumber: res.data.PassportNumber,
            Email: res.data.Email,
        })
      })
      .catch(err => {
        console.log("Error in editing user");
      })


  };

  editPopup = () => {
    confirmAlert({
        title: "Delete Flight",
        message: "Are you sure you want to permanently delete this flight?",
        buttons: [
            {
                label: "Yes",

            },
            {
                label: "No",
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
    });
}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        PassportNumber: this.state.PassportNumber,
        Email: this.state.Email,
    };

        const id = window.localStorage.getItem('ID')
        console.log(id);
        console.log(data)
        axios
        .put('http://localhost:8000/users/EditProfile/61a7a3d32ecf681ee765d77e', data)
        .then(res => {
            this.props.history.push('/');
        })
        .catch(err => {
            console.log("Error in Updating flight");
        })
        confirmAlert({
          customUI: () => {
              return (
                  <div>
                      <h1>Edited User</h1>
                      <p align='center'>Success</p>
                  </div>
              );
          },
          closeOnEscape: true,
          closeOnClickOutside: true,
      });
};


  render() {
    return (
      <>
      <Navbar sticky="top" bg="light" variant="light">
        <Navbar.Brand align="left" href="/">
           {/* <img
                alt=""
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
           />{' '} */}
            Boojoo's Flight Reservation System
        </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/reservations">Reservations</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <a href="/viewUser">User Profile</a>
        </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>  

      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/viewUser" className="btn btn-outline-warning float-left">
                  Back
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit User</h1>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="FirstName">First Name</label>
                      <input
                        type='text'
                        placeholder='First Name'
                        name='FirstName'
                        className='form-control'
                        value={this.state.FirstName}
                        onChange={this.onChange}
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                    <label htmlFor="LastName">Last Name</label>
                      <input
                        type='text'
                        placeholder='Last Name'
                        name='LastName'
                        className='form-control'
                        value={this.state.LastName}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                    <label htmlFor="PassportNumber">Passport Number</label>
                      <input
                        type='text'
                        placeholder='Passport Number'
                        name='PassportNumber'
                        className='form-control'
                        value={this.state.PassportNumber}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className='form-group'>
                    <label htmlFor="Email">Email</label>
                      <input
                        type='text'
                        placeholder='Email'
                        name='Email'
                        className='form-control'
                        value={this.state.Email}
                        onChange={this.onChange}
                      />
                    </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Edit User</button>
            </form>
          </div>

        </div>
      </div>
      </>
    );
  }
}

export default EditUser; 