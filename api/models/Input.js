// load the things we need
const mongoose = require('mongoose')
// [[IMPORTANTE]] no quitar los comentario /#pre#/ que son para rescribir el modelo en tiempo de ejecucion
const preSchema = {/*pre*/
  name: { type: String, index: 'text' },
  type: { type: String, index: 'text' },
  unique: { type: Boolean },
  default: { type: String, default: '' },
  required: { type: Boolean, default: false },
  label: { type: String },
  placeholder: { type: String },
  max: { type: Number },
  min: { type: Number, default: 0 },
  model: { type: String },
  value: { type: String },
/*pre*/}

// define the schema for our user model
const schema = mongoose.Schema(preSchema, { timestamps: true })

// create the model for users and expose it to our app
module.exports = mongoose.model('Input', schema)