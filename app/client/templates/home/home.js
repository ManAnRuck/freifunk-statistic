/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
    nodeStaticData: function () {
            return EJSON.stringify(NodeStatisticData.find({node_id: '14cc20b10a90'}, {fields: {'clients.total':1}}).fetch());
    }

});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
    Meteor.subscribe("node_statistic_data", '14cc20b10a90');
};

Template.Home.rendered = function () {
    var data = NodeStatisticData.find({node_id: '14cc20b10a90'}, {fields: {'clients.total':1}}).fetch();
    console.log(data);
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");
};


Template.Home.destroyed = function () {

};