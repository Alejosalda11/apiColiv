module.exports = {
  isAddFieldDataOK(body) {
    const { schemaName, fieldName, dataField } = body
    const { schema: { paths: model } } = require(`../models/${schemaName}`)
    if (!schemaName) { return { err: true, msg: 'El campo schemaName es requerido.' } }
    if (!fieldName) { return { err: true, msg: 'El campo fieldName es requerido.' } }
    if (!dataField) { return { err: true, msg: 'El campo dataField es requerido.' } }
    if (Object.keys(model).some(v => v.toLocaleLowerCase() === fieldName.toLocaleLowerCase())) { return { err: true, msg: 'El campo esta repetido.' } }

    return { err: false }
  },
  isInputDataOk() {
    /**
     * @todo handler requests para validar que se tenga la informacion correcta al momento de crear input
     */
  },
}