const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

dotenv.config({path:'.env'});
const PORT = process.env.PORT || 8080

app.unsubscribe(morgan('tiny'));

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

app.listen( PORT, ()=>{
    console.log(`Server is now running on https://localhost:${PORT}`);
})