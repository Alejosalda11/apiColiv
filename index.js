const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const bootstrap = require('./config/bootstrap')
const router = require('./config/routes')

const { HOST, PORT, DB } = process.env
const app = express()

mongoose.connect(DB, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false, limit: '600mb' }))
app.use(bodyParser.json({ limit: '600mb' }))

// API ROUTES
app.use('/api/v1', router)

app.listen(PORT, HOST)
bootstrap(HOST, PORT)
