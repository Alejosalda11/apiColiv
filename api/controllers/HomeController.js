const { jwToken } = require('../services')
module.exports = {
  /**
   * Ruta para comprobar que la configuracion inicial de "Rotues" esta bien 
   */
  test(req, res) {
    res.status(200).json({ ok: true })
  },

  /**
   * Ruta para comprobar que el middleware JWT de auth funciona correctamente
   */
  async testAuth(req, res) {
    const decodedToken = await jwToken.decoded(req.headers.authorization, false)
    res.status(200).json({ ok: true, data: { decodedToken } })
  },
}