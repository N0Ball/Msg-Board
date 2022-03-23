const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var Userdb = require('../model/userModel');

exports.login = async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    
    user = await Userdb.findOne({
        name: {$regex: username}
    })
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `No user name found ${username}`
            })
        }else{
            return data;
        }
    }).catch(e => {
        res.status(500).send({
            message: e.message || "Error Login"
        })
    })

    const validPassword = await bcrypt.compare(user.password, password);
            
    if (validPassword){

        res.status(400).send({
            message: `Password incorrect`
        })
        
    }else{

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name
            },
            process.env.SECRET_TOKEN,
            {
                expiresIn: process.env.TOKEN_EXPIRE
            }
        );

        res.status(200).send({
            message: "Success",
            token: `Bearer ${token}`
        });
    }
}