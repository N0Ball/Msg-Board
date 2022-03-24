module.exports = function () {

    return (req, res, next) => {
        req.reply = true;
        next();
    }

}