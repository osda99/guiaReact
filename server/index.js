const mongoose = require("mongoose");
const app = require("./app.js");
const { DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_Server } = require("./constants.js");

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", true)

mongoose.connect(
    `mongodb+srv://${DB_USER + ":" + DB_PASSWORD}@${DB_HOST}/`,
    (error) => {
        if(error) throw error
        app.listen(PORT, () =>{
            console.log("#########################")
            console.log("#### API REST MERN2 ######")
            console.log("#########################")
            console.log(`http://${IP_Server}:${PORT}/api/${API_VERSION}`)
        })
    }
)