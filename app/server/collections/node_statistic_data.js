NodeStatisticData._ensureIndex({"node_id": 1});

Meteor.publish("node_statistic_data", function (nodeId) {
    if (nodeId) {
        return NodeStatisticData.find({
            node_id: nodeId
        }, {
            fields: {'node_id': 1, 'clients.total': 1, datetime: 1},
            sort: {datetime: 1}
        });
    }
});