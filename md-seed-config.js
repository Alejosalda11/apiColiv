const mongoose =  require('mongoose')
require('dotenv').config()

const mongoURL = process.env.DB || 'mongodb://localhost:27017/dbname';
const collections = ['users', 'inputs']

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports.seedersList = {
  Inputs: require('./api/seeders/inputs.seeder'),
  Users: require('./api/seeders/users.seeder'),
}
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports.connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports.dropdb = async () => collections.forEach(collection => mongoose.connection.db.dropCollection(collection)) 
