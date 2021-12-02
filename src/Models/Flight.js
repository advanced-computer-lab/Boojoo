const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    Code:{
        type:String,
        required: true,
    },
    Airport: {
        type: String,
        required: true
    },
    EcoSeats: {
        type: Number,
        required: true,
    },
    BusniessSeats: {
        type: Number,
        required: true
    },
    Date:{
        type: String,
        required: true,
    },
    Terminal: {
        type: Number,
        required: true
    },
    Available:{
        type: String,
       // required: true,
    },
    AvailableBusiness:{
        type: Number,
       // required: true,
    },
    AvailableEconomy:{
        type: Number,
       // required: true,    
    },
    Arrival:{
        type: String,
        required:true
    },
    Departure:{
        type: String,
        required:true
    },
    From:{
        type:String,
        required:false
    },
    To:{
        type:String,
        required:false
    },
    Price:{
        type:String,
        required:false
    },
    TripDuration:{
        type:String,
        required:false
    },
    SeatsArray:{
        type:[Number]
    }


});

module.exports = Flight = mongoose.model('Flight', FlightSchema);