var $ = require('jQuery');

module.exports = function example ( postal ) {

    // We need to tell postal how to get a deferred instance
    postal.configuration.promise.createDeferred = function() {
        return new $.Deferred();
    };
    // We need to tell postal how to get a "public-facing"/safe promise instance
    postal.configuration.promise.getPromise = function( dfd ) {
        return dfd.promise();
    };

    var chn1 = postal.channel("user");

    // SUCCESS REPLY
    var successSubscription = chn1.subscribe("last.login", function( data, envelope ) {
        var result = getLoginInfo(data.userId);
        // `reply` uses a node-style callback, with error as the first arg
        // or data (for success) as the second
        envelope.reply(null, {time: result.time, userId: data.userId});
    });

    // ERROR REPLY
    var errorSubscription = chn1.subscribe("last.login", function( data, envelope ) {
        var result = getLoginInfo(data.userId);
        // `reply` uses a node-style callback, with error as the first arg
        // or data (for success) as the second
        envelope.reply({msg: "No such user"});
    });

    function getLoginInfo ( userId ) {
        return {time: (new Date()).toUTCString()};
    }

    chn1.request({
        topic: "last.login",
        data: {userId: 8675309},
        timeout: 2000
    }).then(
        function( data ) {
            console.log("Last login for userId: " + data.userId + " occurred on " + data.time);
        },
        function( err ) {
            console.log("Uh oh! Error: " + err);
        }
    );

};