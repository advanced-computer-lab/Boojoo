const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
        required: true,
        default:true
    }
});

module.exports = Admin = mongoose.model('Admin', AdminSchema);