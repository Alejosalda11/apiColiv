const Admin = require('../models/Admin')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Usuarios
   */
  async fetch(req, res) {
    const admins = await Admin.find().select("-password")
    res.json({ ok: true, data: { admins }, err: null })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un Admin especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const admin = await Admin.findOne({ _id })
    res.json({ ok: true, data: { admin }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear Usuario
   */
  create(req, res) {
    const admin = new Admin(req.body)
    admin.save((err, newAdmin) => {
      if (err) { return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo administrador creado', newAdmin)
      res.status(200).json({ ok: true, data: { newAdmin }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de usuario
   */
  async update(req, res) {
    const admin = req.body
    // console.log('field', field)
    Admin.findOneAndUpdate({ _id: admin._id }, { $set: admin }, { new: true }, (err, updated) => {
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
    const deleted = await Admin.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}