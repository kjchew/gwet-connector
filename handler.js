'use strict';

var gwetConnector = require('./lib/gwet-connector');
var sfmcConnector = require('./lib/sfmc-connector');
var addRowOp = sfmcConnector.addRow;

var sfmcConfig = require('config').get('country.AU');
var country = 'AU'

function createEvent(event, context, callback){
    var addRowToDE = sfmcConnector.connect(sfmcConfig, addRowOp);
    let xmlContent = event.body;
    let parseObj = gwetConnector.parse(xmlContent);
    // let addResult = addRowToDE(parseObj);
    const response = {
      statusCode: 200,
      body: { //JSON.stringify({
        //message: `parseObj: ${JSON.stringify(parseObj)}`,
        input: parseObj,
      }// })
    };
    callback(null, response);    
}

module.exports = { createEvent }
