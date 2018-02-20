var logger = require('./logger').consolelog;

function gwetXmlParser(content){
    let parser = require('xml-js');
    let obj = parser.xml2js(content, {compact: true, spaces:4});
    logger.debug(`gwetXmlParser: ${JSON.stringify(obj)}`)
    return obj;
}

function gwetObjectTransformation(obj, template){
    let transform = require('jsonpath-object-transform');
    let result  = transform(obj, template);
    return result;
}

function parserFor(parser){
    return function (transform){
        return function (template){
            return function (xmlContent){
                let obj = transform(parser(xmlContent), template);
                return obj;
            }
        }
    }
}
let template = require('../assets/gwet-template').gwetTemplate;
var parse = parserFor(gwetXmlParser)
                      (gwetObjectTransformation)
                      (template);
module.exports = {
    parse
}