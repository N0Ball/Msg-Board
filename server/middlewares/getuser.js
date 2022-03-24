const jwt = require('jsonwebtoken');

module.exports = function () {

    return (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];

            jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {

                if (err){
                    next();
                    return;
                }

                try{
                    req.user = data.name;
                    req.id = data.id;
                    console.log(req.user);
                }catch(e){
                    next();
                }

                next();

            })


        } else {
            next();
        }
    }
}