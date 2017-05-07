module.exports = function(RED) {
    "use strict";

    var ApcAccess = require('apcaccess');

    function ApcConfig(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        node.name = n.name;
        node.host = n.host;
        node.port = n.port;
        node.client = new ApcAccess();

        node.client.connect(node.host, node.port)
          .then(function() {
            node.log('Connected to '+node.host+':'+node.port);
          }).catch( function(err) {
            node.error(err);
          });

        node.client.on('connect', () => {
          node.emit('status',{fill:"green",shape:"dot",text:"online"});
        });

        node.client.on('disconnect', () => {
          node.emit('status',{fill:"red",shape:"ring",text:"offline"});
        });

        node.client.on('error', (error) => {
          node.error(error);
        });

        this.on("close", function() {
          if(node.client.isConnected) {
            node.client.disconnect()
              .then(function() {
                node.log('Disconnected from '+node.host+':'+node.port);
              }).catch( function(err) {
                node.error(err);
              });
          }
        });
    }

    RED.nodes.registerType("apcconfig",ApcConfig);
};
