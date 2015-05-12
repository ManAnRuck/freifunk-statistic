Meteor.startup(function () {
    SyncedCron.add({
        name: 'get nodes',
        schedule: function (parser) {
            // parser is a later.parse object
            return parser.text('every 1 minute');
        },
        job: function () {
            console.log("it dose something");
            return true;
        }
    });
    SyncedCron.start();
    nodeController = new NodeController();
    nodeController.updateStaticNodeInfos();
    
});
