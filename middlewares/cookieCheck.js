module.exports = (req,res,next) => {
    if(req.cookies.usermalva){
        req.session.userLogin = req.cookies.usermalva;
    }

    next()
}