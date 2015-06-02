var _ = require('lodash');

require.ensure(['postal', 'riveter', 'postal.federation', 'postal.xframe', 'postal.request-response'], function( require ) {
    var postal = require('postal');
    var riveter = require('riveter');
    var federation = require('postal.federation')(_, postal, riveter);

    console.log('isEqual', _.isEqual(postal, federation));

    var xframe = require('imports?define=>false!postal.xframe')(postal);

    console.log('isEqual', _.isEqual(postal, xframe));

    var requestResponse = require('postal.request-response');

    console.log('isEqual', _.isEqual(postal, requestResponse));

    require('./example')(postal);

}, 'postal');