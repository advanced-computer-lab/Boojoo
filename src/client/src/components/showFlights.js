import React, {useState, useEffect, Component} from 'react';
import '../App.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ShowFlight() {

    const [flightList, setFlightList] = useState([]);

    const deleteFlight = (id) => {
        axios.delete(`http://localhost:8000/users/:Email/DeleteFlight/${id}`).then( () => {
            window.location.reload(false);
        })
    }

    const deletePopup = _id => {
        confirmAlert({
            title: "Delete Flight",
            message: "Are you sure you want to permanently delete this flight?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteFlight(_id)
                },
                {
                    label: "No",
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    //const filterContent = (allFlights, searchTerm) => {
        //const result = allFlights.filter((flight)=>flight.Code.includes(searchTerm)) 
        //setFlightList(result);
    //}

/*  const handleTextSearch =(e)=>{
        const searchTerm = e.currentTarget.value;
        axios.get('http://localhost:8000/users/:Email/ViewAllFlights').then((allFlights) => {
            if(allFlights.data) {
                console.log(allFlights.data);
                console.log(searchTerm);
                filterContent(allFlights.data, searchTerm)
            }
        })
    } */

    const handleTextSearch =(e)=>{
        const searchTerm = e.currentTarget.value;
        console.log(searchTerm);
        axios.get(`http://localhost:8000/users/:Email/SearchFlight/${searchTerm}`).then((allFlights) => {
            setFlightList(allFlights.data);
        })
        if(searchTerm == ""){
            window.location.reload(false);
        }
    }

    const setId = (id) => {
        console.log(id)
        localStorage.setItem('ID', id);
    }

    useEffect(() =>{
        axios.get('http://localhost:8000/users/:Email/ViewAllFlights').then((allFlights) => {
            setFlightList(allFlights.data);
        })
    }, []) 

    return (
        <>
        <div className="ShowBookList">
        <h2 align="center">All Flights</h2>
        <div>
            <input
            className="form-group"
            type="search"
            placeholder="Search"
            name="searchTerm"
            onChange={handleTextSearch}
            ></input>
        </div>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Flight Code</TableCell>
                <TableCell align="center">Airport</TableCell>
                <TableCell align="center">Terminal</TableCell> 
                <TableCell align="center">From</TableCell> 
                <TableCell align="center">To</TableCell> 
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Arrival Time</TableCell>
                <TableCell align="center">Departure Time</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Cabin Type</TableCell>
                <TableCell align="center">Baggage</TableCell>
                <TableCell align="center">Available</TableCell>
                <TableCell align="center">Seats</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {flightList.map((Flight, key) => (
                <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{Flight.Code}</TableCell>
                    <TableCell align="center">{Flight.Airport}</TableCell>
                    <TableCell align="center">{Flight.Terminal}</TableCell>
                    <TableCell align="center">{Flight.From}</TableCell> 
                    <TableCell align="center">{Flight.To}</TableCell>
                    <TableCell align="center">{Flight.Date}</TableCell>
                    <TableCell align="center">{Flight.Arrival}</TableCell>
                    <TableCell align="center">{Flight.Departure}</TableCell>
                    <TableCell align="center">{Flight.TripDuration}</TableCell>
                    <TableCell align="center">{Flight.Cabin}</TableCell>
                    <TableCell align="center">{Flight.Baggage}</TableCell>
                    <TableCell align="center">{Flight.Available}</TableCell>
                    <TableCell align="center">{Flight.Seats}</TableCell>
                    <TableCell align="right">{Flight.Price}</TableCell>
                    <TableCell align="right">
                        <IconButton aria-label="delete" size="small" onClick={() => deletePopup(Flight._id)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">
                        <Link to = {`/admin/edit-flight/:${Flight._id}`}>
                        <Button variant="outlined" size="small" onClick={() => setId(Flight._id)}>Update</Button>
                        </Link>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <div className="col-md-11">
            <br />
            <br />
            <Link to="/admin/create-flight" className="btn btn-outline-warning float-right">
                + Add New Flight
            </Link>
        </div>
        </div>
        </>        
    );
}