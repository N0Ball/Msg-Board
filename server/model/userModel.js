const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status: String
})

const Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;