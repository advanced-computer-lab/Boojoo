import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NavBar from './navbar';

const setId = (id) => {
    console.log(id)
    localStorage.setItem('ID', id); 
}


class showUserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }



    componentDidMount() {
        const id = window.localStorage.getItem('USERID')
        console.log(id);
        axios
            .get(`http://localhost:8000/users/ViewUser/${id}`)
            .then(res => {
                this.setState({
                    user: res.data
                })
            })
            .catch(err => {
                console.log("Error from usertDescription");
            })
    };

    render() {

        const user = this.state.user;
        let UserItem = <div>
        <table className="table table-hover table-dark">
        <tbody>
        <tr>
            <td>First name:</td>
            <td>{ user.FirstName }</td>
        </tr>
        <tr>
            <td>Last name:</td>
            <td>{ user.LastName }</td>
        </tr>
        <tr>
            <td>Address:</td>
            <td>{ user.Address }</td>
        </tr>
        <tr>
            <td>Country Code:</td>
            <td>{ user.CountryCode }</td>
        </tr>
        <tr>
            <td>Telephone:</td>
            <td>{ user.Telephone }</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>{ user.Email }</td>
        </tr>
        <tr>
            <td>Passport Number:</td>
            <td>{ user.PassportNumber }</td>
        </tr>
        <tr>
            <td>Password:</td>
            <td>
                <Link to={'/changePassword'} className="btn btn-outline-info btn-sm btn-block" >
                    Change Password
                </Link>
            </td>
        </tr>
        </tbody>
        </table>
        </div>

    return (
        <>
        <NavBar/> 

        <div className="ShowBookDetails">
            <div className="container">
                <div className="row">
                    <br />
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Profile</h1>
                        <hr /> <br />
                    </div>
                </div>
                <div>
                    { UserItem }
                </div>
                <div align="center">
                    <div className="col-md-6">
                        <Link to = {`/editUser/:${user._id}`}>
                            <Button variant="outlined" size="large" onClick={() => setId(user._id)}>Edit</Button>
                        </Link>
                        <br />
                    </div> 
                </div> 
            </div>
        </div>
        </> 
    );
    }
}

export default showUserDetails;