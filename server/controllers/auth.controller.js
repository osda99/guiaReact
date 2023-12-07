const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt")

const register = async (req, res) => {
    // ? Mostramos por consola los datos enviados
    // console.log(req.body)
    const { firstname, lastname, email, password } = req.body

    if(!email) return res.status(400).send( { msg: "El email es Necesario" })
    if(!password) return res.status(400).send( { msg: "La contraseña es necesaria" })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            console.log('El correo ya esta en uso')
            return res.status(400).send({ msg: "El correo electrónico ya está en uso" });
        }

    try{
        const newUser = new User({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: hashPassword,
            role: "user",
            active: false
        })

        res.status(200).send( { msg: 'Registrado' })
        await newUser.save()
        console.log('Register Correct')

    } catch(error) {
        res.status(400).send( { msg: 'Error Al crear el usuario' } )
        console.log('Error al crear el usuario')
    }
}

function login(req, res) {
    const { email, password } = req.body
    if(!email) res.status(400).send({msg: 'El email es obligatorio' } )
    if(!password) res.status(400).send({msg: 'La contraseña es obligatorio'})

    const emailLowerCase = email.toLowerCase()

    User.findOne({ email: emailLowerCase }, (error, userStore) => {
        if(error) {
            res.status(500).send({msg: 'Error del servdor' })
        } else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({ msg: 'Error del servidor' })
                } else if (!check) {
                    res.status(400).send({ msg: 'Usuario o Contraseña Incorrecta' })
                } else if (!userStore.active) {
                    res.status(401).send({ msg: 'Usuario no autorizado o no activo' })
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    }) 
                }
            })
        }
    })
}
function refreshAccessToken(req,res){
    const { token } = req.body

    if(!token) res.status(400).send({msg: "Error token requerido"})

    const { user_id } =jwt.decoded(token)
    
    User.findOne({ _id: user_id}, (error, userStore) => {
        if (error){
            res.status(500).send({msg: "Error de Servidor"})
        } else{
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStore)
            })
        }
    })
}


module.exports = {
    register,
    login,
    refreshAccessToken
}
