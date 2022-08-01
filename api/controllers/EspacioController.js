const { Espacio } = require('../models')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Usuarios
   */
  async fetch(req, res) {
    const espacios = await Espacio.find()
    res.json({ ok: true, data: { espacios }, err: null })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un Espacio especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const espacio = await Espacio.findOne({ _id })
    res.json({ ok: true, data: { espacio }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear Usuario
   */
  create(req, res) {
    const espacio = new Espacio(req.body)
    espacio.save((err, nuevoEspacio) => {
      if (err) { return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo espacio creado', nuevoEspacio)
      res.status(200).json({ ok: true, data: { nuevoEspacio }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de usuario
   */
  async update(req, res) {
    const espacio = req.body
    // console.log('field', field)
    Espacio.findOneAndUpdate({ _id: espacio._id }, { $set: espacio }, { new: true }, (err, updated) => {
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
    const deleted = await Espacio.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}