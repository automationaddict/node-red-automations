const yaml = require('js-yaml')
const fs = require('fs')

// Gets the configuration Object from the YAML file
function fetchConfig (path) {
  if (path !== undefined) {
    if (fs.existsSync(path)) {
      try {
        return yaml.load(fs.readFileSync(path, 'utf8'), {})
      } catch (e) {
        throw Error(e)
      }
    } else {
      throw new Error('File does not exist')
    }
  } else {
    throw new Error('Path is required')
  }
}

module.exports.fetchConfig = fetchConfig
