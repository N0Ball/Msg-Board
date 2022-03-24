const jwt = require('jsonwebtoken');

module.exports = function () {

    return (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];

            jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {

                if (err){
                    res.sendStatus(403);
                    return;
                }

                try{
                    req.user = data.name;
                    req.id = data.id;
                }catch(e){
                    res.sendStatus(403);
                    return;
                }

                next();

            })


        } else {
            res.sendStatus(403);
        }
    }
}