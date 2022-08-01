const Inventory = require('../models/Inventory')

module.exports = {
  /**==========================================================================================
   * Ruta para listar Usuarios
   */
  async fetch(req, res) {
    const inventories = await Inventory.find()
    res.json({ ok: true, data: { inventories }, err: null })
  },
  
  /**========================================================================================================
   * Ruta que devuelve un Inventory especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const inventory = await Inventory.findOne({ _id })
    res.json({ ok: true, data: { inventory }, err: null })
  },
  
  /**==========================================================================================
   * Ruta para crear Usuario
   */
  create(req, res) {
    const inventory = new Inventory(req.body)
    inventory.save((err, newInvetory) => {
      if (err) { return res.status('400').json({ ok: false, data: null, err }) }

      console.log('Nuevo inventario creado', newInvetory)
      res.status(200).json({ ok: true, data: { newInvetory }, err: null })
    })
  },

  /**==========================================================================================
   * Ruta actualizar data de usuario
   */
  async update(req, res) {
    const inventory = req.body
    // console.log('field', field)
    Inventory.findOneAndUpdate({ _id: inventory._id }, { $set: inventory }, { new: true }, (err, updated) => {
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
    const deleted = await Inventory.findOneAndDelete({ _id })
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },


}