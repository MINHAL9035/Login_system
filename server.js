const express = require("express")
const path = require("path")
const nocache = require('nocache')
const session = require("express-session")
const { v4: uuidv4 } = require("uuid")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({ 
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')


// load static asset
app.use(express.static(path.join(__dirname, "public")))
app.use('/assets', express.static(path.join(__dirname, "public/assets")))

app.use(nocache())

const router = require('./router')
app.use('/', router)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))


