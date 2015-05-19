/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
    /*
     * Example:
     *
     * '/app/items/insert': function (item) {
     *  if (this.isSimulation) {
     *    // do some client stuff while waiting for
     *    // result from server.
     *    return;
     *  }
     *
     *  // server method logic
     * }
     */
    // Update nodelist
    '/nodes/update': function () {
        Node = new NodeController();
        nodes = Node.getNodes();
        existingNodes = {};
        for(node in nodes) {
            existingNodes[nodes[node]._id] = nodes[node]._id;
        }

        var url = "http://ffmap.freifunk-rheinland.net/nodes.json";

        HTTP.get(url, {}, function (err, response) {
            body = response.content;
            body = JSON.parse(body);
            var i = 0;
            for (node in body.nodes) {
                i++;
                if (node != undefined) {

                    if (existingNodes[node] == undefined) {
                        body.nodes[node]._id = node;
                        var curNode = body.nodes[node];
                        curNode = Nodes.insert(curNode, function (err, result) {
                            //console.log(err);
                            //console.log("node iseted: " + result);

                        });
                    } else {
                    }
                }
            }
        });
    }
});
