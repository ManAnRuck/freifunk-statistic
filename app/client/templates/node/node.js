/*****************************************************************************/
/* Node: Event Handlers */
/*****************************************************************************/
Template.Node.events({
});

/*****************************************************************************/
/* Node: Helpers */
/*****************************************************************************/
Template.Node.helpers({
    nodeName: function() {
        var node = Nodes.findOne({_id: this.nodeId});
        if(node) {
            return node.nodeinfo.hostname;
        }
    },
    nodeInfos: function() {
        var node = Nodes.findOne({_id: this.nodeId});
        if(node) {
            return EJSON.stringify(node);
        }
    }
});

/*****************************************************************************/
/* Node: Lifecycle Hooks */
/*****************************************************************************/
Template.Node.created = function () {
};

Template.Node.rendered = function () {
    Meteor.subscribe("node", this.data.nodeId);

};


Template.Node.destroyed = function () {

};