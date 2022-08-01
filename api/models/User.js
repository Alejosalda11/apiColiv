// load the things we need
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// [[IMPORTANTE]] no quitar los comentario /#pre#/ que son para rescribir el modelo en tiempo de ejecucion
const preSchema = {/*pre*/
  name: { type: String },
  email: { type: String, default: '', unique: true },
  password: { type: String },
  direccion: { type: String, default: '', unique: false },
  edad: { type: Number, default: 0, unique: false },
  estadoCivil: { type: Boolean, default: false, unique: false },
  fechaDeNacimiento: { type: Date, default: 'NO DATE', unique: false },
/*pre*/}

// define the schema for our user model
const schema = mongoose.Schema(preSchema, { timestamps: true })

schema.pre('save', function (next) {
  const user = this
  // only hash password if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', schema)