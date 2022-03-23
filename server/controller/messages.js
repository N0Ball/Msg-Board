var Messagedb = require('../model/msgModel');

exports.create = (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const msg = new Messagedb({
        title: req.body.title,
        content: req.body.content,
        user: req.user,
        status: 1
    })

    msg.save(msg)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a message"
        })
    })

}

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Messagedb.findById(id)
        .then(data => {

            if (!data){
                res.status(404).send({
                    message: "Message not found"
                })
            }else{
                res.send(data);
            }
        }).catch(e => {
            res.status(500).send({
                message: e.message || "Something's wrong"
            })
        })

        return;
    }

    if(req.query.user){
        const user = req.query.user;

        Messagedb.find({
            user: {$regex: user}
        })
        .then(msg => {
            res.send(msg);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while finding a message"
            })
        })

        return;

    }

    Messagedb.find()
    .then(msg => {
        res.send(msg);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while finding a message"
        })
    })
}

exports.update = async (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Data update can not be empty!"
        });
        return;
    }

    const id = req.params.id;

    validation = await validateOperation(id, req.user, res);

    if (!validation){
        return;
    }

    Messagedb.findByIdAndUpdate(id, req.body)
    .then(data => {

        if(!data){

            res.status(404).send({
                message: `Can't find message with ${id}. message not found!`
            });

        }else{
            res.send(data);
        }

    }).catch(e => {
        res.status(500).send({
            message: e.message || "Error Updating message'"
        })
    })


}

exports.delete = async (req, res) => {
    const id = req.params.id;

    if(!id){

        res.status(400).send({
            message: "Id is required"
        })

        return;
    }

    validation = await validateOperation(id, req.user, res);

    if(!validation){
        return;
    }

    validation.status = 0;

    Messagedb.findByIdAndUpdate(id, validation)
    .then(data => {

        if(!data){

            res.status(404).send({
                message: `Can't find message with ${id}. message not found!`
            });

        }else{
            res.status(201).send({
                message: 'Success'
            });
        }

    }).catch(e => {
        res.status(500).send({
            message: e.message || "Error Updating message'"
        })
    })

}

async function validateOperation(id, user, res){
    return Messagedb.findById(id)
    .then(data => {

        if(!data){
            res.status(404).send({
                message: `Can't find message with ${id}. message not found!`
            });

            return false;
        }

        if(data.user !=  user){
            res.status(401).send({
                message: `Can't find modify message that doesn't belongs to current user!`
            });

            return false;
        }

        return data;
    })
}