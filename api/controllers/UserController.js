const User = require('../models/User')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Usuarios
   */
  async fetch(req, res) {
    const users = await User.find().select("-password")
    res.json({ ok: true, data: { users }, err: null })
  },

  /**==========================================================================================
   * Ruta para listar Usuarios para Vuetable
   */
   async fetchVueTable(req, res) {
    console.log('req.query', req.query)
    const { sort, page, per_page, search } = req.query
    const total = await User.countDocuments()
    const data = await User.find().limit(per_page).skip(per_page * (page - 1)).select("-password")
    res.json({
      links: {
        pagination: {
          total,
          per_page,
          current_page: page,
          last_page: 1,
          from: 1,
          to: per_page,
        },
      },
      data,
    })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un User especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const user = await User.findOne({ _id })
    res.json({ ok: true, data: { user }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear Usuario
   */
  create(req, res) {
    console.log('req.body', req.body)
    const user = new User(req.body)
    user.save((err, newUser) => {
      if (err) { 
        console.log('err', err)
        return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo usuario creado', newUser)
      res.status(200).json({ ok: true, data: { newUser }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de usuario
   */
  async update(req, res) {
    const user = req.body
    // console.log('field', field)
    User.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true }, (err, updated) => {
      if (err) { console.log("Something wrong when updating data!") }
      // console.log('updated field', updated)
      res.json({ ok: true, data: { updated }, err: null })
    })
  },

  /**=========================================================================================================
   * Ruta para borrar Usuario
   */
   async delete(req, res) {
    const { _id } = req.params
    const deleted = await User.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}