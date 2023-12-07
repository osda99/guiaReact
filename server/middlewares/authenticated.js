const jwt = require("../utils/jwt")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({msg:"la Peticion no tiene cabecera"})
    }

    const token = req.headers.authorization.replace("Bearer","")

    try {
        const payLoad = jwt.decoded(token)
        
        const {exp} = payLoad
        const currentData = new Date().getTime()

        if(exp <= currentData){
            return res.status(400).send({msg: "El token ah expirado"})
        }

        req.user = payLoad
        next()

    } catch (error) {
        return res.status(400).send({msg: "token invalido"})
    }
}

module.exports = {
    asureAuth
}