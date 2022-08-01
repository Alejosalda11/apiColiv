// load the things we need
const mongoose = require('mongoose')
// [[IMPORTANTE]] no quitar los comentario /#pre#/ que son para rescribir el modelo en tiempo de ejecucion
const preSchema = {/*pre*/
  name: { type: String },
  dimensionX: { type: Number },
  dimensionY: { type: Number },
  dimensionZ: { type: Number },
  dimensionUnit: { type: String },
/*pre*/}

// define the schema for our user model
const schema = mongoose.Schema(preSchema, { timestamps: true })

// create the model for users and expose it to our app
module.exports = mongoose.model('Espacio', schema)