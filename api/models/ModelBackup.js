// load the things we need
const mongoose = require('mongoose')

// define the schema for our user model
const schema = mongoose.Schema({ text: { type: String }}, { timestamps: true })

// create the model for users and expose it to our app
module.exports = mongoose.model('ModelBackup', schema)