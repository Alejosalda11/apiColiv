const { Event } = require('../models')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Events
   */
  async fetch(req, res) {
    const events = await Event.find()
    res.json({ ok: true, data: { events }, err: null })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un Event especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const event = await Event.findOne({ _id })
    res.json({ ok: true, data: { event }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear Servicio
   */
  create(req, res) {
    const event = new Event(req.body)
    event.save((err, newEvent) => {
      if (err) { return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo event creado', newEvent)
      res.status(200).json({ ok: true, data: { newEvent }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de servicio
   */
  async update(req, res) {
    const event = req.body
    // console.log('field', field)
    Event.findOneAndUpdate({ _id: event._id }, { $set: event }, { new: true }, (err, updated) => {
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
    const deleted = await Event.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}