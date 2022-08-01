const { rewriteModelScriptAdd, rewriteModelScriptRemove } = require('./FSservice')
const { SCHEMA_TYPES } = require('../utils/const')

module.exports = {
  /**==================================================================================================================================
   * Devuelve la data de un modelo especifico
   * @param {Object} collection
   * @returns {Array} schema data
   */
  getCollectionKeys(Collection) {
    const { schema: { paths } } = Collection
    const schemaKeys = Object.keys(paths)
        .filter(key => key !== '_id' && 
        key !== 'updatedAt' && key !== 'createdAt' && 
        key !== '__v' &&
        /**
         * @todo: El query no sirve con numeros, en algun punto necesita arreglo para que funcione
         */
        (String(paths[key].instance).toLowerCase() === 'string' /*|| String(paths[key].instance).toLowerCase() === 'number'*/))
    return schemaKeys
  },

  /**==================================================================================================================================
   * Devuelve la data de un modelo especifico
   * @param {String} schemaName
   * @returns {Object} schema data
   */
  getModelData(schemaName) {
    const { schema: { paths } } = require(`../models/${schemaName}`)
    const schemaKeys = Object.keys(paths).filter(key => key !== '_id' && key !== 'updatedAt' && key !== 'createdAt' && key !== '__v')
    const schema = schemaKeys.map(key => {
      const aux = {...paths[key].options}
      aux.type = paths[key].instance
      return { [key]: aux }
    })
    return schema
  },

  /**==================================================================================================================================
   * Agrega un nuevo campo a un modelo ya existente
   * @param {String} schemaName Nombre del modelo
   * @param {String} fieldName Nombre del campo para agregar al modelo
   * @param {Object} dataField Data del campo del schema
   */
  addKeyToScheme(schemaName, fieldName, dataField) {
    const SchemaModel = require(`../models/${schemaName}`)
    const field = { [fieldName]: {...dataField}}
    field[fieldName].type = SCHEMA_TYPES[dataField.type]
    console.log('Field mongoose to add', field)
    SchemaModel.schema.add(field)
    // console.log('SchemaModel', SchemaModel.schema.paths)
    rewriteModelScriptAdd(schemaName, fieldName, dataField)
  },
  
  /**==================================================================================================================================
   * Remueve un campo a un modelo existente
   * @param {String} schemaName Nombre del modelo o schema
   * @param {String} fieldName Nombre del campo a borrar
   */
  removeKeyToScheme(schemaName, fieldName) {
    const SchemaModel = require(`../models/${schemaName}`)
    SchemaModel.schema.remove(fieldName)
    rewriteModelScriptRemove(schemaName, fieldName)
  },
}