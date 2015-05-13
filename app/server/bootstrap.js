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
    //SyncedCron.start();
});
