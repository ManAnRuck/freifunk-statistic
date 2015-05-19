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
        return Nodes.find({}, {sort: {'nodeinfo.hostname' : 1}}).fetch();

    }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
    Meteor.subscribe("node");
};

Template.Home.rendered = function () {
    console.log(Nodes.find({}).count());
};


Template.Home.destroyed = function () {

};