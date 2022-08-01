// load the things we need
const mongoose = require('mongoose')
// [[IMPORTANTE]] no quitar los comentario /#pre#/ que son para rescribir el modelo en tiempo de ejecucion
const preSchema = {/*pre*/
  dateinit: { type: Date },
  datefinish: { type: Date },
/*pre*/}

// define the schema for our user model
const schema = mongoose.Schema(preSchema, { timestamps: true })

// create the model for users and expose it to our app
module.exports = mongoose.model('Reservation', schema)