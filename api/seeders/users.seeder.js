const consola = require('consola')
const { Seeder } = require('mongoose-data-seed')
const { User } = require('../models')

class InputsSeeder extends Seeder {
  
  async shouldRun() {
    const { deletedCount } = await User.deleteMany()
    console.log('\r\n')
    consola.success('User droped count: ' + deletedCount, '\r\n')
    return User.countDocuments().exec().then(count => count === 0);
  }
  
  async run() {
    return User.create(data);
  }
}

module.exports = InputsSeeder;

const data = [
  {
    name: "Jose Alfredo",
    email: "jose@mail.com",
    password: 1234,
  },
]
