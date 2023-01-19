const expect = require('chai').expect
const helper = require('../../src/helpers/occupancy-helper')
const path = require('path')

const filename = path.join(__dirname, '../../nodes/occupancy/settings.yaml')

describe('fetchConfig', function () {
  describe('Fetch configuration values from YAML file', function () {
    it('should throw error with no path', function () {
      expect(() => { helper.fetchConfig(undefined) }).to.throw()
    })
    it('should throw error with bad path', function () {
      expect(() => { helper.fetchConfig('nonsense.xyz') }).to.throw()
    })

    it('should not throw YAML configuration error', function () {
      expect(() => { helper.fetchConfig(filename) }).to.not.throw()
    })

    it('should have main properties', function () {
      expect(helper.fetchConfig(filename)).to.have.keys(['inputArgs', 'controlArgs'])
    })
  })
})
