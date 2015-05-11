Meteor.startup(function () {
    request = Meteor.npmRequire("request");
    SyncedCron.add({
        name: 'Crunch some important numbers for the marketing department',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 1 minute');
        },
        job: function() {
            var url = "http://ffmap.freifunk-rheinland.net/alfred_merged.json";

            request({
                url: url,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    var i = 0;
                    for(node in body) {
                        i++;
                    }
                    console.log( i);
                    if(i > 1000) {
                        console.log(body);
                    } else {
                        console.log( body["14:cc:20:b1:0a:90"].traffic.tx.bytes);
                    }

                } else {
                    console.log(error);
                }
            })
            console.log("it dose something");
            return true;
        }
    });
    SyncedCron.start();
});
