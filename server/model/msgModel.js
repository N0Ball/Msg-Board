const mongoose = require('mongoose');

var msgSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    content:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    parentid:{
        type: String,
        required: true
    },  
    status: Number
})

const Messagedb = mongoose.model('messagedb', msgSchema);

module.exports = Messagedb;