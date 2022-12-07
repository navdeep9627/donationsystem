let jwt = require('jsonwebtoken');


exports.checkSession = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.status(200).jsonp({status: "error", message: "not authenticated"});
    }    
};

exports.checkToken = (req, res, next) => {
    let auth = req.headers['authorization'];
    if(auth){
        let token = auth.split(' ')[1]
        if(token && token !== 'null'){
            next();
        }
        else{
            res.status(200).jsonp({status: "error", message: "not authenticated"});
        }
    }
    else{
        res.status(200).jsonp({status: "error", message: "not authenticated"});
    }
}

exports.isAuthenticated = (req, res) => {
    let auth = req.headers['authorization'];
    if(auth){
        let token = auth.split(' ')[1]
        if(token && token !== 'null'){
            const decodeToken = jwt.verify(token, 's3cr3tk3y');
            const role = decodeToken?.role;
            const email = decodeToken?.email;
            const name = decodeToken?.name;
            const userId = decodeToken?.userId;
            res.status(200).jsonp({status: "success", message: "authenticated", role, email, name, userId});
        }
        else{
            res.status(200).jsonp({status: "error", message: "not authenticated"});
        }
    }
    else{
        res.status(200).jsonp({status: "error", message: "not authenticated"});
    }
};
