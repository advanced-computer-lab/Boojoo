const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
    },
    AdminPrivilieges:{
        type: Boolean,
        required: false,
        default:false
    },
    PassportNumber:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:false
    },
    LastName:{
        type:String,
        required:false
    },
    Cart:{
        type:Array,
        default:[],
        required : false
    },
    Address:{
        type:String,
        required:false
    },
    CountryCode:{
        type:Number,
        required:false
    },
    Telephone:{
        type:Number,
        required:false
    }
});

module.exports = User = mongoose.model('User', UserSchema);