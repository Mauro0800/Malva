module.exports = (req,res,next) => {
    if(req.session.userLogin){
        res.locals.userLogin = req.session.userLogin
        console.log(locals.userLogin);
    }

    next()
}