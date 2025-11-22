function rolChecker(req, res, next){
    if(req.user.rol == "administrador"){
        return next();
    }
    res.redirect('/');
}

export default rolChecker;