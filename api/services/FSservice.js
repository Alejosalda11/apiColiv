const fs = require('fs')
const ModelBackup = require('../models/ModelBackup')

module.exports = {
    /**========================================================================================================================================
   * [AGREGAR] Reescribe el archivo del modelo en tiempo de ejecucion
   * @param {String} schemaName Nombre del modelo
   * @param {String} fieldName Nombre del campo para agregar al modelo
   * @param {Object} dataField Data del campo del schema
   * @returns {void}
   */
  rewriteModelScriptAdd(schemaName, fieldName, dataField) {
    const quotes = dataField.type === 'String' ? "'" : ''
    const field = `${fieldName}: { type: ${dataField.type}, default: ${quotes}${dataField.default}${quotes}, unique: ${dataField.unique} }`
    console.log('String field to rewrite model', field)
    // get data
    const dataModel = fs.readFileSync(`./api/models/${schemaName}.js`, 'utf8')
    const splitedModel = dataModel.split('/*pre*/')
    const preSchema = splitedModel[1].split('\r\n')
    preSchema.pop(); preSchema.shift();
    // add data
    preSchema.push('  ' + field  + ',')
    const newSchema = preSchema.join('\r\n')
    splitedModel[1] = '\r\n' + newSchema + '\r\n'
    const newModel = splitedModel.join('/*pre*/')
    // rewrite script
    fs.writeFileSync(`./api/models/${schemaName}.js`, newModel)
    // save backup
    const mb = new ModelBackup({ text: newModel })
    mb.save()
  },

  /**==========================================================================================================================================
   * [Remove] Reescribe el archivo del modelo en tiempo de ejecucion
   * @param {String} schemaName Nombre del modelo
   * @param {String} fieldName Nombre del campo para quitar del modelo
   * @returns {void}
   */
  rewriteModelScriptRemove(schemaName, fieldName) {
    // prepare data
    const dataModel = fs.readFileSync(`./api/models/${schemaName}.js`, 'utf8')
    const splitedModel = dataModel.split('/*pre*/')
    let preSchema = splitedModel[1].split('\r\n')
    preSchema.pop(); preSchema.shift();
    // remove data
    preSchema = preSchema.filter(v => !v.includes(fieldName))
    const newSchema = preSchema.join('\r\n')
    splitedModel[1] = '\r\n' + newSchema + '\r\n'
    const newModel = splitedModel.join('/*pre*/')
    console.log('newModel', newModel)
    // rewrite script
    fs.writeFileSync(`./api/models/${schemaName}.js`, newModel)
  }
}