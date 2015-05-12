Meteor.startup(function () {
    SyncedCron.add({
        name: 'Update Node Statistic Data',
        schedule: function (parser) {
            // parser is a later.parse object
            return parser.text('every 5 minutes');
        },
        job: function () {
            nodeController.updateNodeStatisticData();
            return true;
        }
    });
    SyncedCron.start();
    nodeController = new NodeController();
    nodeController.updateStaticNodeInfos();
});
