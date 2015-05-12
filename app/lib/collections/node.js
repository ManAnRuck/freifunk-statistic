Nodes = new Meteor.Collection('node');

if(typeof Schemas == "undefined") {
    Schemas = {};
}

Schemas.Node = new SimpleSchema({
    statistics: {
        type: Object
    },
    firstseen: {
        type: Date
    },
    lastseen: {
        type: Date
    },
    nodeinfo: {
        type: Object
    }
});

//Nodes.attachSchema(Schemas.Node);