module.exports = function(RED) {
    "use strict";

    var ApcAccess = require('apcaccess');

    function ApcConfig(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        node.name = n.name;
        node.host = n.host;
        node.port = n.port;
        node.interval = 1000;
        node.attemts = 0;
        node.decay = 1.5;
        node.maxInterval = 30 * 60 * 1000;
        node.client = new ApcAccess();

        function connect() {
          node.client.connect(node.host, node.port);
        }

        node.client.on('connect', () => {
          node.attemts = 0;
          node.emit('status',{fill:"green",shape:"dot",text:"online"});
          node.log('Connected to '+node.host+':'+node.port);
        });

        node.client.on('disconnect', () => {
          node.attemts++;
          var timeout = node.interval * Math.pow(node.decay, node.attemts);
          timeout = timeout > node.maxInterval ? node.maxInterval : timeout;
          node.emit('status',{fill:"red",shape:"ring",text:"offline"});
          node.log("Disconnected. Tries to reconnect in "+timeout/1000+" seconds.");
          node.timeout = setTimeout(connect, timeout);
        });

        node.client.on('error', (error) => {
          node.error(error);
        });

        this.on("close", function() {
          if(node.timeout) {
            clearTimeout(node.timeout);
          }
          if(node.client.isConnected) {
            node.client.disconnect()
              .then(function() {
                node.log('Disconnected from '+node.host+':'+node.port);
              }).catch( function(err) {
                node.error(err);
              });
          }
          node.client.removeAllListeners();
        });
        connect();
    }

    RED.nodes.registerType("apcconfig",ApcConfig);
};
