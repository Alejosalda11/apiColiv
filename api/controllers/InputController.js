const camelCase = require('camelcase')
const { Input } = require('../models')
const { ModelService, UtilService } = require('../services')

module.exports = {
  /**=========================================================================================================
   * Ruta para listar Inputs
   */
  async fetch(req, res) {
    const query = req.query
    const inputs = await Input.find(query)
    res.json({ ok: true, data: { inputs }, err: null })
  },

  /**=========================================================================================================
   * Ruta para listar Inputs VueTable
   */
   async fetchVueTable(req, res) {
    console.log('req.query', req.query)
    const { page, per_page, search } = req.query
    const { model } = req.params
    const sort = Array.isArray(req.query.sort) ? JSON.parse(req.query.sort) : {}
    const inputModelKeys = ModelService.getCollectionKeys(Input)
    const $or = inputModelKeys.map(key => ({ [key]: { $regex: search, $options: 'i' }}))
    const sortQuery = { [sort.field]: sort.direction }
    console.log('sortQuery', sortQuery)
    const total = await Input.countDocuments({ model, $or })
    const data = await Input.find({ model, $or }).sort(sortQuery).limit(per_page).skip(per_page * (page - 1))
    res.json({
      links: {
        pagination: {
          total,
          per_page,
          current_page: page,
          last_page: Math.ceil(total / per_page),
          from: 1,
          to: per_page,
        },
      },
      data,
    })
  },

  /**========================================================================================================
   * Ruta que devuelve un Input especifico
   */
  async getOne(req, res) {
    const { _id } = req.params
    const input = await Input.findOne({ _id })
    res.json({ ok: true, data: { input }, err: null })
  },

  /**=========================================================================================================
   * Ruta para crear nuevo Input
   */
  async create(req, res) {
    console.log('req.body', req.body)
    const fieldName = camelCase(req.body.name)
    req.body.value = fieldName
    const input = await (new Input(req.body)).save()
    const { model: schemaName } = input
    const dataField = { type: UtilService.capitalize(input.type), default: input.default, unique: input.unique }
    ModelService.addKeyToScheme(schemaName, fieldName, dataField)
    res.json({ ok: true, data: { input }, err: null })
  },

  /**=========================================================================================================
   * Ruta para actualizar Input
   */
  update(req, res) {
    const input = req.body
    // console.log('field', field)
    Input.findOneAndUpdate({ _id: input._id }, { $set: input }, { new: true }, (err, updated) => {
      if (err) { console.log("Something wrong when updating data!") }
      // console.log('updated field', updated)
      res.json({ ok: true, data: { updated }, err: null })
    })
  },


  /**
   * =========================================================================================================
   * Ruta para borrar Input
   */
  async delete(req, res) {
    const { _id } = req.params
    const deleted = await Input.findOneAndDelete({ _id })
    const { model: schemaName, value: fieldName } = deleted
    ModelService.removeKeyToScheme(schemaName, fieldName)
    res.status(200).json({ ok: true, data: { deleted }, err: null })
  },
}
