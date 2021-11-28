const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    Attendant:{
        type: Schema.Types.ObjectId,
        required: true
    },
    Tickety:{
        type:Schema.Types.ObjectId,
        required: true
    },
    SeatNumber:{
        type:String,
        required : true
    }
},{timestamps:true});

module.exports = Reservation = mongoose.model('Reservation', ReservationSchema);