Meteor.publish("node", function () {
        return Nodes.find({
        }, {
            fields: {'_id': 1, 'nodeinfo.hostname': 1},
            sort: {'nodeinfo.hostname': 1}
        });
});