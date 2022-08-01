const _ = require('lodash')
const { ModelService } = require('../services')
const { isAddFieldDataOK } = require('../utils/handlers')
const { SCHEMAS } = require('../utils/const')

module.exports = {
  /**====================================================================================
   * Ruta para listar modelos
   */
  listModels(req, res) {
    res.json({ ok: true, data: SCHEMAS, err: null})
  },

  /**====================================================================================
   * Ruta para listar modelos Para se usado en Vue 2 DataTable plugin
   */
   listModelsVueTable(req, res) {
    console.log('req.query', req.query)
    const { sort, page, per_page, search } = req.query
    // console.log('values', SCHEMAS.filter(v => _.values(v).some(e => (new RegExp(search, 'i').test(e)))))
    const schemas = SCHEMAS.filter(v => _.values(v).some(e => (new RegExp(search, 'i')).test(e)))
    if (sort) {
      // const [field, direction] = sort.split('|')
      const { field, direction } = JSON.parse(sort[0])
      if (direction === 'asc') {
        schemas.sort((a, b) => {
          if(a[field] < b[field]) { return -1; }
          if(a[field] > b[field]) { return 1; }
          return 0
        })
      } else {
        schemas.sort((a, b) => {
          if(a[field] > b[field]) { return -1; }
          if(a[field] < b[field]) { return 1; }
          return 0
        })
      }
    }
    const chunks = _.chunk(schemas, per_page)
    const data = chunks[page - 1]

    res.json({
      links: {
        pagination: {
          total: schemas.length,
          per_page,
          current_page: page,
          last_page: chunks.length,
          from: 1,
          to: per_page,
        },
      },
      data,
    })
  },

  /**====================================================================================
   * Ruta para devolver la informacion de un modelo, su schema
   */
  getModelVueTable(req, res) {
    const { schemaName } = req.params
    const model = ModelService.getModelData(schemaName)
    const data = model.map(v => {
      const name = Object.keys(v)[0]
      return { name, ...v[name] }
    })
    res.json({ data })
  },

  /**====================================================================================
   * Ruta para devolver la informacion de un modelo, para VUE TABLE 2
   */
   getModel(req, res) {
    const { schemaName } = req.params
    const model = ModelService.getModelData(schemaName)
    res.json({ ok: true, data: model, err: null })
  },

  /**====================================================================================
   * Ruta para [AGREGAR] dinamicamente un nuevo campo al schema de un modelo
   */
  addField(req, res) {
    const { err, msg } = isAddFieldDataOK(req.body)
    if (err) { throw new Error(msg) }
    
    const { schemaName, fieldName, dataField } = req.body
    ModelService.addKeyToScheme(schemaName, fieldName, dataField)
    res.json({ ok: true, data: 'Campo agregado a modelo', err: null })
  },
  
  /**====================================================================================
   * Ruta para [QUITAR] dinamicamente un campo al schema de un modelo
   */
  removeField(req, res) {
    const { schemaName, fieldName } = req.body
    ModelService.removeKeyToScheme(schemaName, fieldName)
    res.json({ ok: true, data: 'Campo borrado del modelo', err: null })
  }
}