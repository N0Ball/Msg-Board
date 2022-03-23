const bcrypt = require('bcrypt');

const Userdb = require('../model/userModel');

exports.create = async (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    userExist = await Userdb.findOne({
        name: {$regex: req.body.name}
    }).then(data => {
        if(data){
            res.status(400).send({
                message: `User with name ${req.body.name} already registered`
            });
            return true;
        }
        return false;
    });

    if (userExist){
        return;
    }

    const user = new Userdb(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save(user)
    .then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a user"
        })
    })

}

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {

            if (!data){
                res.status(404).send({
                    message: "User not found"
                });
            }else{
                res.send({
                    id: data.id,
                    name: data.name
                });
            }
        }).catch(e => {
            res.status(500).send({
                message: e.message || "Something's wrong while finding user"
            })
        });

        return;
    }

    if(req.query.name){
        const name = req.query.name;

        Userdb.findOne({
            name: {$regex: name}
        })
        .then(data => {
            if (!data){
                res.status(404).send({
                    message: "User not found"
                });
            }else{
                res.send({
                    id: data.id,
                    name: data.name
                });
            }
        }).catch(e => {
            res.status(500).send({
                message: e.message || "Something's wrong while finding user"
            })
        });

        return;
    }

    Userdb.find()
    .then(user => {
        
        users = Array();
        user.forEach( e  => {
            users.push({
                id: e.id,
                name: e.name
            })
        });
        res.status(200).send(users);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while finding a user"
        })
    })
}

exports.update = (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Data update can not be empty!"
        });
        return;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Can't find user with ${id}. User not found!`
            });
        }else{
            res.send(data);
        }
    }).catch(e => {
        res.status(500).send({
            message: e.message || "Error Updating user"
        })
    })


}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if (!data){
            res.status(404).send({
                message: `Can't delete with id ${id}. Something is Wrong`
            })
        }else{
            res.status(200).send({
                message: "User was deleted successfully!"
            })
        }
    }).catch(e => {
        res.status(500).send({
            message: `Could not delete User with id = ${id}`
        })
    })
}