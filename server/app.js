const mongoose = require("mongoose");
const express = require ("express")
const cors = require("cors")
const { API_VERSION} = require ("./constants.js");
const bodyParser = require("body-parser");

const app = express()
// configuaracion carpeta
app.use(express.static(`uploads`))

// todo importacion de rutas
const authRoutes = require("./router/auth.router.js")
const userRoutes = require("./router/user.router.js")
const menuRoutes = require("./router/menu.router")
const courseRoutes = require("./router/course.router.js")
const postRoutes = require("./router/post.router.js")
const newsletterRoutes = require("./router/newsletter.router.js")


// todo importaciones del body parse
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// todo configurar los header y cars
app.use(cors())
// todo configurar RUtas
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes) 
app.use(`/api/${API_VERSION}`, courseRoutes)
app.use(`/api/${API_VERSION}`, postRoutes)
app.use(`/api/${API_VERSION}`, newsletterRoutes)

module.exports = app