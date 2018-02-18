'use strict';

var gwetConnector = require('./lib/gwet-connector');
var gwetXmlParser = gwetConnector.xmlParser;
var gwetObjectTransformation = gwetConnector.transfom;
var gwetObjTemplate = gwetConnector.template;
var sfmcConnector = require('./lib/sfmc-connector');
var addRowOp = sfmcConnector.addRow;

async function readFromFS (filename){
    let filePtr = require ('fs');
    let util = require('util');
    const readFileAsync = util.promisify(filePtr.readFile);
    return await readFileAsync(filename);
}


var filename = './assets/sample-contact.xml';
var sfmcConfig = require('config').get('country.AU');
var country = 'AU'

function createEvent(event, context, callback){
    var addRowToDE = sfmcConnector.connect(sfmcConfig, addRowOp);
    let xmlContent = event.body;
    let parseObj = gwetConnector.parse(xmlContent)
                                        (gwetXmlParser)
                                        (gwetObjectTransformation)
                                        (gwetObjTemplate);
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

//Test Run
var event = {};
var context = {};
function callback (err, response){
  if (err){
    throw new Error (err);
  }
  console.log(JSON.stringify(response.body));
}

readFromFS(filename).then(function (xmlContent){
  event.body = xmlContent;
  createEvent(event, context, callback);
});

module.exports = { createEvent }
