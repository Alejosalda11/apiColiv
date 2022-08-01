// load the things we need
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
// [[IMPORTANTE]] no quitar los comentario /#pre#/ que son para rescribir el modelo en tiempo de ejecucion
const preSchema = {/*pre*/
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
/*pre*/}

// define the schema for our admin model
const schema = mongoose.Schema(preSchema, { timestamps: true })

schema.pre('save', function (next) {
  const admin = this
  // only hash password if it has been modified (or is new)
  if (!admin.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(admin.password, salt, function (err, hash) {
      if (err) return next(err)
      admin.password = hash
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

// create the model for admins and expose it to our app
module.exports = mongoose.model('Admin', schema)