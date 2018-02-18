'use strict';

var gwetConnector = require('./lib/gwet-connector');
var gwetXmlParser = gwetConnector.xmlParser;
var gwetObjectTransformation = gwetConnector.transfom;
var sfmcConnector = require('./lib/sfmc-connector');
var addRowOp = sfmcConnector.addRow;

async function readFromFS (filename){
    let filePtr = require ('fs');
    let util = require('util');
    const readFileAsync = util.promisify(filePtr.readFile);
    return await readFileAsync(filename);
}


var filename = './assets/sample-event.xml';
var gwetObjTemplate = {event: {event_id: '$.Online_Event.Event.Event_ID._text'}};
var sfmcConfig = require('config').get('country.AU');
var country = 'AU'

function createEvent(event, context, callback){
    var addRowToDE = sfmcConnector.connect(sfmcConfig, addRowOp);
    readFromFS(filename)
    .then(function (xmlContent) {
        let parseObj = gwetConnector.parse(xmlContent)
                                           (gwetXmlParser)
                                           (gwetObjectTransformation)
                                           (gwetObjTemplate);
        let addResult = addRowToDE(parseObj);
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: `parseObj: ${JSON.stringify(parseObj)}, addResult: ${addResult}`,
            input: event,
          })
        };
        callback(null, response);    
    });
}

//Test Run
let event = {};
let context = {};
function callback (err, response){
  if (err){
    throw new Error (err);
  }
  console.log(JSON.stringify(response));
}
createEvent(event, context, callback);


module.exports = { createEvent }
