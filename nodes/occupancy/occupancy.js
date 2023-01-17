/*
 * Copyright (c) 2023.  John Nelson - All rights reserved
 */
module.exports = function (RED) {
  function Occupancy (config) {
    RED.nodes.createNode(this, config)
    const node = this
    node.config = config

    node.on('input', function (msg, send, done) {
      send = send || function () { node.send.apply(node, arguments) }

      try {
        msg.payload = 'something'
        node.send(msg)
      } catch (err) {
        node.status({ fill: 'red', shape: 'dot', text: 'error' })
        if (done) {
          done(err)
        }
      }
    })

    node.on('close', function (removed, done) {
      if (removed) {
      // this node has been disabled/deleted
      } else {
      // This node is being restarted
      }
      done()
    })
  }RED.nodes.registerType('occupancy', Occupancy)
}
