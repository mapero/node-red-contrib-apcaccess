module.exports = function(RED) {
    "use strict";

    var ApcAccess = require('apcaccess');
    var validCmds = [
      "status",
      "events",
      "statusJson"
    ];

    function ApcRequest(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        node.name = n.name;
        node.server = RED.nodes.getNode(n.server);

        node.server.on('status', function(status) {
          node.status(status);
        });

        node.on('input', function(msg) {
          if (validCmds.indexOf(msg.payload) > -1 && node.server.client.isConnected) {
            switch(msg.payload) {
              case 'status':
                node.server.client.getStatus()
                  .then(function(result) {
                    msg.payload = result;
                    node.send(msg);
                  });
                  break;
              case 'statusJson':
                node.server.client.getStatusJson()
                  .then(function(result) {
                    msg.payload = result;
                    node.send(msg);
                  });
                  break;
              case 'events':
                node.server.client.getEvents()
                  .then(function(result) {
                    msg.payload = result;
                    node.send(msg);
                  });
                  break;
            }
          } else if (!node.server.client.isConnected) {
            node.warn('Client is not connected to server. Check the configuration.');
          } else {
            node.warn('Invalid Command. Use: status, statusJson or events');
          }
        });

        node.on("close", function() {

        });
    }

    RED.nodes.registerType("apcrequest",ApcRequest);
};
