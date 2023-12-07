const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    firtsname: {
        type: String,
        require: true,
        trim: true
    },
    lastname:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        uniqued: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
    },
    role: String,
    active: Boolean,
    avatar: String
})

module.exports = mongoose.model("User", UserSchema)