const { Service } = require('../models')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Servicios
   */
  async fetch(req, res) {
    const espacios = await Service.find()
    res.json({ ok: true, data: { espacios }, err: null })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un Service especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const service = await Service.findOne({ _id })
    res.json({ ok: true, data: { service }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear Servicio
   */
  create(req, res) {
    const service = new Service(req.body)
    service.save((err, newService) => {
      if (err) { return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo service creado', newService)
      res.status(200).json({ ok: true, data: { newService }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de servicio
   */
  async update(req, res) {
    const service = req.body
    // console.log('field', field)
    Service.findOneAndUpdate({ _id: service._id }, { $set: service }, { new: true }, (err, updated) => {
      if (err) { console.log("Something wrong when updating data!") }
      // console.log('updated field', updated)
      res.json({ ok: true, data: { updated }, err: null })
    })
  },

  /**=========================================================================================================
   * Ruta para borrar Servicio
   */
   async delete(req, res) {
    const { _id } = req.params
    const deleted = await Service.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}