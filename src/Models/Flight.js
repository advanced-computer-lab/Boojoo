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
        type:[String],
        required:false
    },
    Seats:{
        type:Number,
        required:false
    },
    Cabin:{
        type:String,
        required:false
    },
    Baggage:{
        type:String,
        required:false
    } 
});

module.exports = Flight = mongoose.model('Flight', FlightSchema);