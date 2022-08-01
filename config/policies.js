const { jwToken } = require('../api/services')
module.exports = {
  /**
   * Middleware para proteger las rutas que necesitan autenticacion de usuario.
   * @param {*} req 
   * @param {*} res 
   * @param {Function} next callback 
   * @returns 
   */
  isUserAuthorized(req, res, next) {
    var token;

    if (req.headers && req.headers.authorization || req.query.authorization ) {
      var parts = req.query.authorization ? req.query.authorization.split(' ') :  req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return res.status(403).json({ ok: false, data: null, err: 'Format is Authorization: Bearer [token]' });
      }
    } else if (req.query.token) {
      token = req.query.token;
      // We delete the token from query to not mess with blueprints
      delete req.query.token;
    } else {
      return res.status(403).json({ ok: false, data: null, err: 'No Authorization header was found' });
    }

    jwToken.verify(token, false, function (err, token) {
      if (err) return res.status(403).json({ ok: false, data: null, err: 'Invalid auth Token!' });
      req.token = token; // This is the decrypted token or the payload you provided
      next();
    });
  },
    /**
   * Middleware para proteger las rutas que necesitan autenticacion de usuario Admin.
   * @param {*} req 
   * @param {*} res 
   * @param {Function} next callback 
   * @returns 
   */
  isAdminAuthorized(req, res, next) {
    var token;

    if (req.headers && req.headers.authorization || req.query.authorization ) {
      var parts = req.query.authorization ? req.query.authorization.split(' ') :  req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return res.status(403).json({ ok: false, data: null, err: 'Format is Authorization: Bearer [token]' });
      }
    } else if (req.query.token) {
      token = req.query.token;
      // We delete the token from query to not mess with blueprints
      delete req.query.token;
    } else {
      return res.status(403).json({ ok: false, data: null, err: 'No Authorization header was found' });
    }

    jwToken.verify(token, true, function (err, token) {
      if (err) return res.status(403).json({ ok: false, data: null, err: 'Invalid auth Token!' });
      req.token = token; // This is the decrypted token or the payload you provided
      next();
    });
  },
}
