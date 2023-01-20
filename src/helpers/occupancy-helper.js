const yaml = require('js-yaml')
const fs = require('fs')

// Gets the configuration Object from the YAML file
function fetchConfig (path) {
  if (path !== undefined) {
    if (fs.existsSync(path)) {
      try {
        return yaml.load(fs.readFileSync(path, 'utf8'), {})
      } catch (e) {
        throw Error(e) // YAML Error
      }
    } else {
      throw new Error('File does not exist')
    }
  } else {
    throw new Error('Path is required')
  }
}

function ReadConfig (msg, fetchConfigCallback) {
  /** @namespace data.inputArgs */
  this.payload = msg.payload
  this.control = msg.control // Add control to msg Object
  this.type = msg.type // Add type to msg Object
  this.data = fetchConfigCallback()
  this.validKey = function () {
    if (this.type === 'inputArgs') {
      return Object.prototype.hasOwnProperty.call(this.data[this.type], this.payload)
    } else if (this.type === 'controlArgs') {
      return this.data[this.type][this.control].includes(msg.payload)
    }
  }
  this.getValue = function () {
    if (this.validKey()) {
      return this.data.inputArgs[this.payload]
    } else {
      throw new Error(`Payload: ${this.payload} is invalid!`)
    }
  }
}

module.exports.fetchConfig = fetchConfig
module.exports.readConfig = ReadConfig
