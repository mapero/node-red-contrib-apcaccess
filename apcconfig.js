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
            node.emit('status',{fill:"green",shape:"dot",text:"connected"});
          }).catch( function(err) {
            node.error(err);
            node.emit('status',{fill:"red",shape:"ring",text:"error"});
          });

        this.on("close", function() {
          if(node.client.isConnected) {
            node.client.disconnect()
              .then(function() {
                node.log('Disconnected from '+node.host+':'+node.port);
                node.emit('status',{fill:"red",shape:"ring",text:"disconnected"});
              }).catch( function(err) {
                node.error(err);
                node.emit('status',{fill:"red",shape:"ring",text:"error"});
              });
          }
        });
    }

    RED.nodes.registerType("apcconfig",ApcConfig);
};
