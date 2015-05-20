/*****************************************************************************/
/* Node: Event Handlers */
/*****************************************************************************/
Template.node_clients_chart.events({
    'change #chartTime': function (e, template, value) {
        Session.set("chartTime", $(e.target).find(':selected').val());
    }
});

/*****************************************************************************/
/* Node: Helpers */
/*****************************************************************************/
Template.node_clients_chart.helpers({
    selectValues: function () {
        var hours = [];
        var maxHours = 1000;
        for (var i = 1; i <= maxHours; i++) {
            hours.push(i);
        }
        return hours;
    },
    isSelectedValue: function (currentValue) {
        return (Session.get("chartTime") == currentValue) ? true : false;
    }
});

/*****************************************************************************/
/* Node: Lifecycle Hooks */
/*****************************************************************************/
Template.node_clients_chart.created = function () {
    Session.set("chartTime", 1);
};

Template.node_clients_chart.rendered = function () {
    Meteor.subscribe("node", this.data.nodeId);
    Meteor.subscribe("node_statistic_data", this.data.nodeId);
    template = this;



    //Width and height
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 1200 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;


    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%H:%M"));


    var line = d3.svg.line()
        .x(function (d) {
            return x(d.datetime);
        })
        .y(function (d) {
            return y(d.clients.total);
        });

    var svg = d3.select("#lineChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Clients");

    svg.append("g")
        .attr("class", "grid");

    Tracker.autorun(function () {
        var maxClients = 0;
        dataset = NodeStatisticData.find(
            {
                node_id: template.data.nodeId,
                datetime: {$gt: moment().subtract(Session.get("chartTime"), 'hours')._d}
            }, {
                fields: {'clients.total': 1, datetime: 1},
                sort: {datetime: 1}
            }).fetch();
        var paths = svg.selectAll("path.line")
            .data([dataset]); //todo - odd syntax here - should use a key function, but can't seem to get that working

        maxClients = d3.max(dataset, function (d) {
            return d.clients.total;
        });

        x.domain(d3.extent(dataset, function (d) {
            return d.datetime;
        }));
        //y.domain(d3.extent(dataset, function(d) { return d.clients.total; }));
        y.domain([0, d3.max(dataset, function (d) {
            return d.clients.total;
        })]);

        //Update X axis
        svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);



        yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(maxClients)
            .tickFormat(d3.format("d"))
            .tickSubdivide(0);

        //Update Y axis
        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);

        svg.select(".grid")
            .call(d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(maxClients)
                .tickSize(-width, 0, 0)
                .tickFormat("")
        );

        paths
            .enter()
            .append("path")
            .attr("class", "line")
            .attr('d', line);

        paths
            .attr('d', line); //todo - should be a transisition, but removed it due to absence of key

        paths
            .exit()
            .remove();
    });

};


Template.node_clients_chart.destroyed = function () {

};