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

function parse(xmlContent){
    return function (parser){
        return function (transform){
            return function (template){
                let obj = transform(parser(xmlContent), template);
                return obj;
            }
        }
    }
}
let template = require('../assets/gwet-template').gwetTemplate;
module.exports = {
    parse,
    xmlParser: gwetXmlParser,
    transfom: gwetObjectTransformation,
    template
}