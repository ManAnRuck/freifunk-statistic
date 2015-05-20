/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
    nodes: function() {
        //return Nodes.find({}, {sort: {'nodeinfo.hostname' : 1}}).fetch();
        return Nodes.find({}).fetch();

    },
    nodeColorClass: function(node) {
        if(node.statistics.uptime || node.statistics.clients > 0) {
            return 'green';
        } else if(moment(node.lastseen).format() > moment().subtract(1, 'hours').format()) {
            return 'orange';
        } else {
            return 'red';
        }
    }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
    Meteor.subscribe("node");
};

Template.Home.rendered = function () {
};


Template.Home.destroyed = function () {

};