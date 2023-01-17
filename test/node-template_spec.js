/*
 * Copyright (c) 2023.  John Nelson - All rights reserved
 */
const helper = require('node-red-node-test-helper')
const templateNode = require('../nodes/node-template/node-template.js')

describe('node-template Node', function () {
  afterEach(function () {
    helper.unload()
  })

  it('should be loaded', function (done) {
    const flow = [{ id: 'n1', type: 'node-template', name: 'test name' }]
    helper.load(templateNode, flow, function () {
      const n1 = helper.getNode('n1')
      n1.should.have.property('name', 'test name')
      done()
    })
  })

  it('should make payload do something', function (done) {
    const flow = [
      { id: 'n1', type: 'node-template', name: 'test name', wires: [['n2']] },
      { id: 'n2', type: 'helper' }
    ]
    helper.load(templateNode, flow, function () {
      const n2 = helper.getNode('n2')
      const n1 = helper.getNode('n1')
      n2.on('input', function (msg) {
        msg.should.have.property('payload', 'something')
        done()
      })
      n1.receive({ payload: 'something' })
    })
  })
})
