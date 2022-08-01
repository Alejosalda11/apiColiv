const consola = require('consola')
const { Seeder } = require('mongoose-data-seed')
const { Input } = require('../models')

const data = [
  {
    name: 'Default Input String',
    value: 'defaultInputString',
    type: 'string',
    unique: false,
    default: '',
    required: false,
    label: 'Input por defecto',
    placeholder: 'Escribe aqui.',
    max: 300,
    min: 0,
    model: 'Default',
  },
  {
    name: 'Default Input Number',
    value: 'defaultInputNumber',
    type: 'number',
    unique: false,
    default: 0,
    required: false,
    label: 'Input por defecto',
    placeholder: 'Ingrese cantidad.',
    max: 999999999999,
    min: 0,
    model: 'Default',
  },
  {
    name: 'Default Input Boolean',
    value: 'defaultInputBoolean',
    type: 'boolean',
    unique: false,
    default: false,
    required: false,
    label: 'Input por defecto',
    placeholder: 'Elige opcion',
    max: 100,
    min: 0,
    model: 'Default',
  },
]

class InputsSeeder extends Seeder {

  async shouldRun() {
    const { deletedCount } = await Input.deleteMany()
    console.log('\r\n')
    consola.success('Input droped count: ' + deletedCount, '\r\n')
    return Input.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Input.create(data);
  }
}

module.exports = InputsSeeder;
