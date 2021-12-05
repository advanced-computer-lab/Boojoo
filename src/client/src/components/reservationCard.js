import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../App.css';
import emailjs from "emailjs-com";
import{ init } from 'emailjs-com';

const ReservationCard = (props) => {

    const  reservation  = props.reservation;

    const deleteFlight = (id) => {
        axios.delete(`http://localhost:8000/flights/CancelReservation/${id}`).then( () => {
            confirmAlert({
                title: "Cancelled",
                message: "Check Mail for Refund",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => handleSubmit()
                    },
    
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
        })

    }

    // axios
    //         .get('http://localhost:8000/users/ViewUser/61a7a3d32ecf681ee765d77e')
    //         .then(res => {
    //             this.setState({
    //                 user: res.data
    //             })
    //         })
    //         .catch(err => {
    //             console.log("Error from usertDescription");
    //         })

    // const user = this.state.user

        function handleSubmit() {
        sendFeedback("service_asy0wzd", "template_ogn6pch", {
            message: "We would like to confirm your cancellation, " + reservation.Price +" to be refunded.",
            to_name: "Mohamed1",
            from_name: "Boojoo's Airline Reservation System",
            email: "haha@gmail.com",
        });

        localStorage.setItem('ISDELETED', true);
      }
      

    function sendFeedback(serviceID, templateId, variables) {
        emailjs
          .send(serviceID, templateId, variables, "user_CCxKgwz23h5XgPi9io3gH")
          .then((res) => {
            console.log("Email successfully sent!");
          })
          // Handle errors here however you like, or use a React error boundary
          .catch((err) =>
            console.error(
              "Oh well, you failed. Here some thoughts on the error that occured:",
              err
            )
          );
      }


    const deletePopup = _id => {
        confirmAlert({
            title: "Flight Cancellation",
            message: "Are you sure you want to cancel this flight?",
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

    return(
        <div className="card-container-xlg">
            <div className="desc">
                <h2 font-weight="bold">Confirmation Code: {reservation._id }</h2>
                <p>Number of seats: {reservation.SeatNumber.length}</p>
                <p>Reserved Seats:</p>
                {
                    reservation.SeatNumber.map(paragraph => <p>Seat:{paragraph}</p>)
                }
                <p>Price: {reservation.Price}</p>
                <div>
                    <div padding="5" className="btn btn-outline-warning float">
                        <Link to={`/details/${reservation.Tickety}`}>
                            <Button onClick={() => localStorage.setItem('IDDETAILS', reservation.Tickety)}>Flight Details </Button>
                        </Link>
                    </div>
                    <div padding="5" className="btn btn-outline-warning float">
                    <Button align="left" size="small" onClick={() => deletePopup(reservation._id)}>Cancel</Button>
                    </div> 
                </div>
            </div>
    <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
    ></script>
      <script type="text/javascript">
        {function () {
          emailjs.init("user_CCxKgwz23h5XgPi9io3gH");
        }}
        ();
    </script>
        </div>
        
    )
};

export default ReservationCard; 