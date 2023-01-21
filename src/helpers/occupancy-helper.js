/**
 * Gets the configuration Object from the YAML file
 * @requires module:nodeca/js-yaml
 * @requires module:fs
 * @since 0.0.1
 * @module FetchConfig
 * @param {string} path path to the settings.yaml file
 * @returns {Object} the YAML file converted to a JSON Object
 * @throws {YAMLException} if YAML formatting is incorrect
 * @throws {Error} 'File does not exist' if file cannot be located
 * @throws {Error} 'Path is required' if not path is passed
 * @example
 * FetchConfig('./path/to/settings.yaml')
 */
const yaml = require('js-yaml')
const fs = require('fs')

function FetchConfig (path) {
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

/**
 * Evaluates msg.payload and msg.control then returns a boolean
 * representation of the msg.payload passed from the upstream node
 * @namespace data.inputArgs inputArgs namespace
 * @class
 * @since 0.0.1
 * @module ReadConfig
 * @param {Object} msg object passed to the node from upstream node
 * @param {function} fetchConfigCallback callback function to receive valid settings object
 * @returns {boolean} conversion of msg.payload to true/false value
 * @throws {Error} 'Payload: msg.payload is invalid!' if msg.payload cannot be converted
 * @todo Implement msg.control validation
 * @example
 * const result = new ReadConfig(msg, () => FetchConfig('./path/to/settings.yaml'))
 */
function ReadConfig (msg, fetchConfigCallback) {
  this.payload = msg.payload
  this.control = msg.control // TODO: Add control to msg Object
  this.type = msg.type // TODO: Add type to msg Object
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

module.exports.fetchConfig = FetchConfig
module.exports.readConfig = ReadConfig
