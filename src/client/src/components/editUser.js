import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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
};


  render() {
    return (
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
    );
  }
}

export default EditUser; 