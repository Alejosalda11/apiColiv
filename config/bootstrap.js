const consola = require('consola')

module.exports = async (HOST, PORT) => {
  consola.ready({ message: `Server listening on http://${HOST}:${PORT}`, badge: true })
}
