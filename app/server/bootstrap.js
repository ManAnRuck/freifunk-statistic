Meteor.startup(function () {
    SyncedCron.add({
        name: 'Update Node Statistic Data',
        schedule: function (parser) {
            // parser is a later.parse object
            return parser.text('every 5 minutes');

        },
        job: function () {
            var nodeController = new NodeController();
            nodeController.updateNodeStatisticData();
            return true;
        }
    });
    SyncedCron.add({
        name: 'Update Node Static Data',
        schedule: function (parser) {
            // parser is a later.parse object
            return parser.text('every 15 minutes');

        },
        job: function () {
            var nodeController = new NodeController();
            nodeController.updateStaticNodeInfos();
            return true;
        }
    });
    var nodeController = new NodeController();
    nodeController.updateStaticNodeInfos();
    SyncedCron.start();
});
