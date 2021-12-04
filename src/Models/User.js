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
        required:false
    },
    FirstName:{
        Type:String,
        required:false
    },
    LastName:{
        Type:String,
        required:false
    },
    Cart:{
        Type:Array,
        default:[]
    }
});

module.exports = User = mongoose.model('User', UserSchema);