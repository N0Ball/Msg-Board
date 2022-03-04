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
        status: req.body.status
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

exports.update = (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Data update can not be empty!"
        });
        return;
    }

    const id = req.params.id;
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

exports.delete = (req, res) => {
    const id = req.params.id;

    Messagedb.findByIdAndDelete(id)
    .then(data => {
        if (!data){
            res.status(404).send({
                message: `Can't delete with id ${id}. Something is Wrong`
            })
        }else{
            res.status(200).send({
                message: "message was deleted successfully!"
            })
        }
    }).catch(e => {
        res.status(500).send({
            message: `Could not delete message with id = ${id}`
        })
    })
}