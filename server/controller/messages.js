var Messagedb = require('../model/msgModel');

exports.create = (req, res) => {

    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let parentid = '0';
    if (req.reply){
        parentid = req.params.id;
    }

    if (!req.reply){
        if(!req.body.title){

            res.status(400).send({
                message: "ERROR, no title is given"
            });

            return;

        }
    }

    const msg = new Messagedb({
        title: req.body.title,
        content: req.body.content,
        user: req.user,
        parentid: parentid,
        status: 1
    });

    msg.save(msg)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a message"
        })
    })

}

exports.find = async (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        let message = await Messagedb.findById(id)
        .then(data => {

            if (!data){
                res.status(404).send({
                    message: "Message not found"
                });
                return undefined;
            }

            if (data.status == 1){
                    return data;
            }

            res.status(404).send({
                message: "Message not found"
            });
            return undefined;

        }).catch(e => {
            res.status(500).send({
                message: e.message || "Something's wrong"
            })
            return undefined;
        })

        if (message){

            const replies = await Messagedb.find({
                parentid: {$eq: id}
            })
            .then( data => {
                return data;
            }).catch( e => {
                res.status(500).send({
                    message: e.message || "Something's wrong"
                })
            });

            const result = Object.assign(message._doc, {replies: replies});
            res.send(result);
        }

        return;
    }

    if(req.query.user){
        const user = req.query.user;

        if (!req.user){

            Messagedb.find({
                user: {$regex: user},
                status: {$eq: 1}
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

        Messagedb.find({
            user: {$regex: user}
        })
        .then(msg => {
            res.send(msg);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while finding a message"
            })
        });

        return;
    }

    Messagedb.find({
        parentid: {$eq: '0'},
        status: {$eq: 1}
    })
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

    // Can't update message status
    req.body.status = 1;

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