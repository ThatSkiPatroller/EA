module.exports = function (req, res, next) {
    console.log('checkin gif user is authenticated')
    if (req.isAuthenticated()) {
        console.log('authentication was successful')
        return next();
    }
    console.log('authentication was not successful')
    res.redirect('/')
}