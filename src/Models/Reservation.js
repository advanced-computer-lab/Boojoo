const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    Attendant:{
        type: Schema.Types.ObjectId,
        required: false
    },
    Tickety:{
        type:Schema.Types.ObjectId,
        required: false
    },
    SeatNumber:{
        type:[String],
        required : false
    },
    Price:{
        type:Number,
        required : false
    }
},{timestamps:true});

module.exports = Reservation = mongoose.model('Reservation', ReservationSchema);