import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NavBar from './navbar';
 
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Address:'',
      CountryCode:'',
      Telephone:'',
      PassportNumber: '',
      Email:'',        
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/users/ViewUser/${window.localStorage.getItem('USERID')}`)
      .then(res => {
        this.setState({
            FirstName: res.data.FirstName,
            LastName: res.data.LastName,
            Address: res.data.Address,
            CountryCode: res.data.CountryCode,
            Telephone: res.data.Telephone,
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
        title: "Edit Info",
        message: "Are you sure you want to permanently edit your info?",
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
        Address: this.state.Address,
        CountryCode: this.state.CountryCode,
        Telephone: this.state.Telephone,
        PassportNumber: this.state.PassportNumber,
        Email: this.state.Email,
    };

        const id = window.localStorage.getItem('USERID')
        console.log(id);
        console.log(data)
        axios
        .put(`http://localhost:8000/users/EditProfile/${id}`, data)
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
                      <h1>Edited Profile</h1>
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
      <NavBar/> 

      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to={`/viewUser/${window.localStorage.getItem('USERID')}`} className="btn btn-outline-warning float-left">
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