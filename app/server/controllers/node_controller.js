NodeController = RouteController.extend({
    layoutTemplate: 'MasterLayout',

    subscriptions: function () {
    },

    // Get all saved Nodes
    getNodes: function () {
        nodes = Nodes.find().fetch();
        return nodes;
    },
    updateStaticNodeInfos: function () {
        Node = new NodeController();
        nodes = this.getNodes();
        existingNodes = {};
        for (node in nodes) {
            existingNodes[nodes[node]._id] = nodes[node]._id;
        }

        var url = Meteor.settings.ff.nodesUrl;

        HTTP.get(url, {}, function (err, response) {
            if (!err && response.statusCode == 200) {
                body = EJSON.parse(response.content);

                var i = 0;
                for (node in body.nodes) {
                    i++;
                    if (node != undefined) {

                        if (existingNodes[node] == undefined) {
                            body.nodes[node]._id = node;
                            body.nodes[node].nodeinfo.hostname_lowercase = body.nodes[node].nodeinfo.hostname.toLowerCase();
                            var curNode = body.nodes[node];
                            Nodes.insert(curNode, function (err, result) {
                            });
                        } else {
                            body.nodes[node]._id = node;
                            body.nodes[node].nodeinfo.hostname_lowercase = body.nodes[node].nodeinfo.hostname.toLowerCase();
                            var curNode = body.nodes[node];
                            Nodes.update({_id: curNode._id}, curNode);
                        }
                    }
                }
            } else {
                console.log(err);
                console.log(response.statusCode);
            }
        });
    },
    updateNodeStatisticData: function () {
        var url = Meteor.settings.ff.alfredMergedUrl;
        HTTP.get(url, {}, function (err, response) {
            if (!err && response.statusCode == 200) {
                var nodes = EJSON.parse(response.content);

                var i = 0;

                for (node in nodes) {
                    node = nodes[node];
                    var nodeStatistic = {
                        node_id: node.node_id,
                        uptime: node.uptime,
                        rootfs_usage: node.rootfs_usage,
                        memory: node.memory,
                        clients: node.clients,
                        idletime: node.idletime,
                        processes: node.processes,
                        traffic: node.traffic,
                        loadavg: node.loadavg,
                        datetime: new Date()
                    };

                    NodeStatisticData.insert(nodeStatistic);

                    if (i == 1) {
                    }
                    i++;
                }

            } else {
                console.log(err);
                console.log(response.statusCode);
            }
        })
    }
});
