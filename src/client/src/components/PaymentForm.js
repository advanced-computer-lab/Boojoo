import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import '../App.css';
import React, { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import NavBar from './navbar';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
            backgroundColor: "#2c3e50",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
            height: "10px",
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ff0000"
		}
	}
}

const reserveFlight = (id) => {
    const reservationId = window.localStorage.getItem('RESERVATIONID');
    const seatNumberArray = window.localStorage.getItem('SELECTEDSEATS').split(',')
    console.log(seatNumberArray);
    const data = {
        Attendant: window.localStorage.getItem('USERID'),
        Tickety: window.localStorage.getItem('IDDETAILS'),
        SeatNumber: seatNumberArray,
        Price: window.localStorage.getItem('PRICE')
    };

    console.log(data);

    axios
        .post(`http://localhost:8000/flights/ReserveFlight/${window.localStorage.getItem('IDDETAILS')}`, data)
        .then(res => {
        })
        .catch(err => {
            console.log("Error in Reserving flight");
        })
}

const deleteReservation = () => {
    const reservationId = window.localStorage.getItem('RESERVATIONID');
    const Id = window.localStorage.getItem('ID');
    axios.delete(`http://localhost:8000/flights/CancelReservation/${reservationId}`)
    .then( () => {
        console.log("old deleted")
        confirmAlert({
            title: "Edit Reservation",
            message: "Your reservation has been updated",
            buttons: [
                {
                    label: "Okay",
                    onClick: () => reserveFlight(Id) 
                },
            ],
            closeOnEscape: false,
            closeOnClickOutside: false,
        });  
    })
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8000/flights/payment", {
                amount: window.localStorage.getItem('PRICE'),
                id
            })

            if(response.data.success) {
                const seatNumberArray = window.localStorage.getItem('SELECTEDSEATS').split(',')
     
     console.log(seatNumberArray);
     if( window.localStorage.getItem('FLIGHT') == "departure"){
        const data = {
            Attendant: window.localStorage.getItem('USERID'),
            Tickety: window.localStorage.getItem('ID'),
            SeatNumber: seatNumberArray,
            Price: window.localStorage.getItem('PRICE')
        };
        console.log(data); 

        axios
         .post(`http://localhost:8000/flights/ReserveFlight/${window.localStorage.getItem('ID')}`, data)
         .then(res => {
             confirmAlert({
                 customUI: () => {
                     return (
                         <div>
                             <h1>Flight Reserved</h1>
                             <p align='center'>Success</p>
                         </div>
                     );
                 },
                 closeOnEscape: true,
                 closeOnClickOutside: true,
             });
         })
         .catch(err => {
             console.log("Error in Reserving flight");
       })

     }
     
     else if(window.localStorage.getItem('FLIGHT') == "returning"){
        const data = {
            Attendant: window.localStorage.getItem('USERID'),
            Tickety: window.localStorage.getItem('RETURNID'),
            SeatNumber: seatNumberArray,
            Price: window.localStorage.getItem('PRICE')
        };
        console.log(data);

        axios
         .post(`http://localhost:8000/flights/ReserveFlight/${window.localStorage.getItem('RETURNID')}`, data)
         .then(res => {
             confirmAlert({
                 customUI: () => {
                     return (
                         <div>
                             <h1>Flight Reserved</h1>
                             <p align='center'>Success</p>
                         </div>
                     );
                 },
                 closeOnEscape: true, 
                 closeOnClickOutside: true,
             });
         })
         .catch(err => {
            console.log("Error in Reserving flight");
       })
     }

     else if(window.localStorage.getItem('FLIGHT') == "editing"){
        confirmAlert({
            title: "Edit Flight",
            message: "Are you sure you want to change your flight?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteReservation()
    
                },
                {
                    label: "No",
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
     }

                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <div className="ShowBookDetails">
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <h1 className="display-4 text-center">Payment</h1>
            <hr/>
            <fieldset className="FormGroup">
                <div className="form-group">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="btn btn-outline-warning mt-4">Pay</button>
        </form>
        :
        <div>
            <h6 className="display-4 text-center">Payment Successful</h6>
            <hr/>
            <Link to={'/reservations'} className="btn btn-outline-info btn-lg btn-block">
                Check Reservation
            </Link>
        </div> 
        }
        </>
        </div>
    )
}