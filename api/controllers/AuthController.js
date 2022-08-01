const { User, Admin } = require('../models')
const { jwToken } = require('../services')

module.exports = {
  /**
   * Ruta para autenticar usuario
   */
  async UserLogin(req, res) {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ ok: false, data: null, err: 'Invalid password or email' })

    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).json({ ok: false, data: null, err: 'Invalid password or email' })
      if (!isMatch) return res.status(400).json({ ok: false, data: null, err: 'Invalid password or email' })
      user = { _id: user._id, email: user.email, name: user.name }
      const token = jwToken.issue(user, false)
      res.json({ ok: true, data: { token, user }, err: null })
    })
  },
  /**
   * Ruta para autenticar usuario Admin
   */
   async AdminLogin(req, res) {
    const { email, password } = req.body
    let admin = await Admin.findOne({ email })
    if (!admin) return res.status(400).json({ ok: false, data: null, err: 'Invalid password or email' })

    admin.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).json({ ok: false, data: null, err: 'Invalid password or email' })
      if (!isMatch) return res.status(400).json({ ok: false, data: null, err: 'Invalid password or email' })
      admin = { _id: admin._id, email: admin.email, name: admin.name }
      const token = jwToken.issue(admin, true)
      res.json({ ok: true, data: { token, admin }, err: null })
    })
  }
}