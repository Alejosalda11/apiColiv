const SCHEMA_TYPES = {
  'String': String,
  'Boolean': Boolean,
  'Number': Number,
  'Date': Date,
}

const SCHEMAS = [
  { model: 'User', text: 'Usuarios' },
  { model: 'Admin', text: 'Administracion' },
  { model: 'Inventory', text: 'Inventario' },
  { model: 'Espacio', text: 'Espacios' },
  { model: 'Reservation', text: 'Reservas' },
  { model: 'Service', text: 'Servicios' },
  { model: 'Event', text: 'Eventos' },
  { model: 'Input', text: 'Inputs' },
]

module.exports = { SCHEMA_TYPES, SCHEMAS }