var Userdb = require('../model/model');

exports.create = (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = new Userdb({
        name: req.body.name,
        password: req.body.password,
        status: req.body.status
    })

    user.save(user)
    .then(data => {
        res.send(data);
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
                })
            }else{
                res.send(data);
            }
        }).catch(e => {
            res.status(500).send({
                message: e.message || "Something's wrong"
            })
        })
    }

    Userdb.find()
    .then(user => {
        res.send(user);
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