Meteor.publish("node", function (_id) {
    if(_id) {
        return Nodes.find({
            _id: _id
        }, {
            limit: 1
        });
    } else {
        return Nodes.find({
        }, {
            fields: {'_id': 1, 'nodeinfo.hostname': 1, lastseen: 1, 'statistics': 1, 'nodeinfo.hostname_lowercase': 1},
            sort: {'nodeinfo.hostname_lowercase': 1}
        });

    }

});