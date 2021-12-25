import React, {useState, useEffect, Component} from 'react';
import '../App.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NavBar from './navbar';

const editPopup = () => {
    confirmAlert({
        customUI: () => {
            return (
                <div>
                    <h1>Please Login First</h1>
                </div>
            );
        },
        closeOnEscape: true,
        closeOnClickOutside: true,
    });
}

export default function MainFlight() {

    const [flightList, setFlightList] = useState([]);
    const [success, setSuccess ] = useState(true);

    useEffect(() =>{
        axios.get('http://localhost:8000/users/:Email/ViewAllFlights').then((allFlights) => {
            setFlightList(allFlights.data);
            if(window.localStorage.getItem('token') !== null){
                setSuccess(false);
            }
        })
    }, [])

    const setId = (id, seats, seatsArray) => {
        console.log(id)
        localStorage.setItem('ID', id);
        localStorage.setItem('SEATS', seats);
        localStorage.setItem('SEATSARRAY',seatsArray);
    }

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

    return (
        <>
        <NavBar/>
        
        <div className="ShowBookList">
        <h2 align="center">Upcomming Flights</h2>
        <div className='form-group'>
            <label htmlFor="Airport">Search:</label>
            <input
            className="form-control"
            type="search"
            placeholder="e.g. from, to, cabin, date, airport, baggage, duration, price, arrival time, departure time, etc.."
            name="searchTerm"
            onChange={handleTextSearch}
            ></input>
        </div>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
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
                        {success?
                        <Button variant="outlined" size="small" onClick={() => editPopup()}>Details</Button>
                        :
                        <Link to = {`flightDescription/${Flight._id}`}>
                        <Button variant="outlined" size="small" onClick={() => setId(Flight._id, Flight.Seats, Flight.SeatsArray)}>Details</Button>
                        </Link>
                        }
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
        </>        
    );
}
