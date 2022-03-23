const jwt = require('jsonwebtoken');

module.exports = function () {

    return (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];

            if (jwt.verify(token, process.env.SECRET_TOKEN)){
                req.token = token;
                next();
            }else{
                res.sendStatus(403);
            }


        } else {
            res.sendStatus(403);
        }
    }
}