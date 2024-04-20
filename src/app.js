const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const app = express()

const conn = require('./db/conn') // Conexão com DATABASE

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(require('body-parser').json())
app.use(express.urlencoded({ extended: true }))

// Routes ==================
app.use(require('./routes/userRoutes'))
// Routes ==================

require('dotenv').config()

const environment = process.env.NODE_ENV
const { port } = require(`./config/config.${environment}.json`)


conn
    .sync()
    .then(() => {
        app.listen(port, console.log("Server Running"))
    })
    .catch((err) => console.log("Conection Error", err))