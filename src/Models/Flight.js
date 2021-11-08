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
        type: String,
        required: true,
    },
    BusniessSeats: {
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true,
    },
    Terminal: {
        type: String,
        required: true
    },
    Available:{
        type: String,
        required: true,
    },
    Arrival:{
        type: String,
        required:true
    },
    Departure:{
        type: String,
        required:true
    }

});

module.exports = Flight = mongoose.model('Flight', FlightSchema);