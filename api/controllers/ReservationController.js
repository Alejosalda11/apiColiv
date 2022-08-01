const Reservation = require('../models/Reservation')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Reservaciones
   */
  async fetch(req, res) {
    const reservations = await Reservation.find()
    res.json({ ok: true, data: { reservations }, err: null })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un Reservation especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const reservation = await Reservation.findOne({ _id })
    res.json({ ok: true, data: { reservation }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear nueva Reservacion
   */
  create(req, res) {
    const reservation = new Reservation(req.body)
    reservation.save((err, newReservation) => {
      if (err) { return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo reservacion creada', newReservation)
      res.status(200).json({ ok: true, data: { newReservation }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de reservacion
   */
  async update(req, res) {
    const reservation = req.body
    // console.log('field', field)
    Reservation.findOneAndUpdate({ _id: reservation._id }, { $set: reservation }, { new: true }, (err, updated) => {
      if (err) { console.log("Something wrong when updating data!") }
      // console.log('updated field', updated)
      res.json({ ok: true, data: { updated }, err: null })
    })
  },

  /**=========================================================================================================
   * Ruta para borrar Reservacion
   */
   async delete(req, res) {
    const { _id } = req.params
    const deleted = await Reservation.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}