const mongoose = require('mongoose');

var msgSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    status: String
})

const Messagedb = mongoose.model('messagedb', msgSchema);

module.exports = Messagedb;