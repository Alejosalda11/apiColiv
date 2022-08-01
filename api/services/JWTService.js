require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET_USER, SECRET_ADMIN } = process.env

// Genera un token
/**==============================================================================================================================
 * Convertir object a JWT string
 * @param {Object} payload 
 * @param {Boolean} isAdmin Definie si es auth para user o para admin
 * @returns 
 */
module.exports.issue = function(payload, isAdmin) {
  return jwt.sign(
    payload,
    isAdmin ? SECRET_USER : SECRET_ADMIN, // Token Secret
    {
      expiresIn : 60 * 60 * 12 // minutes
    }
  )
}
/**==============================================================================================================================
 * Verfica el token de un request
 * @param {String} token 
 * @param {Boolean} isAdmin Definie si es auth para user o para admin
 * @param {Function} callback 
 * @returns 
 */
module.exports.verify = function(token, isAdmin, callback) {
  return jwt.verify(
    token, // The token to be verified
    isAdmin ? SECRET_USER : SECRET_ADMIN, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  )
}
/**==============================================================================================================================
 * Decodifica JWT
 * @param {*} authorization 
 * @param {Boolean} isAdmin Definie si es auth para user o para admin
 * @returns 
 */
module.exports.decoded = async function(authorization, isAdmin) {
  return jwt.verify(authorization.split(' ')[1], isAdmin ? SECRET_USER : SECRET_ADMIN, function(err, decoded) {
    // console.log(decoded) // bar
    return decoded
  })
}
