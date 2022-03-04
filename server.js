const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config({path:'.env'});
const PORT = process.env.PORT || 8080

app.use(morgan('tiny'));

app.use(bodyparser.urlencoded({ extended:true }));

app.set("view engine", 'ejs');
app.set("view", path.resolve(__dirname, "views/ejs"));

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/jg', express.static(path.resolve(__dirname, "assets/js")));

app.get('/echo', (req, res) => {
    res.send("Hello, World!");
})

app.listen( PORT, ()=>{
    console.log(`Server is now running on https://localhost:${PORT}`);
})