NodeController = RouteController.extend({
    layoutTemplate: 'MasterLayout',

    subscriptions: function() {
    },

    action: function() {
        this.render('Node');
    },
    data: function() {
        return {nodeId: this.params.nodeId}
    }
});
