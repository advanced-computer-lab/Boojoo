import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ReservationCard = (props) => {
    const  reservation  = props.reservation;

    return(
        <div className="card-container">
            <div className="desc">
                <h2>{reservation.Attendant }</h2>
                <h3>{reservation.Tickety}</h3>
                <p>{reservation.SeatNumber}</p>
            </div>
        </div>
    )
};

export default ReservationCard;