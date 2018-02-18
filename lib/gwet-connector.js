function gwetXmlParser(content){
    let parser = require('xml-js');
    let obj = parser.xml2js(content, {compact: true, spaces:4});
    console.log(`gwetXmlParser: ${JSON.stringify(obj)}`)
    return obj;
}

function gwetObjectTransformation(obj, template){
    let transform = require('jsonpath-object-transform');
    let result  = transform(obj, template);
    return result;
}

function parseXml2Obj(xmlContent){
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
    parse: parseXml2Obj,
    xmlParser: gwetXmlParser,
    transfom: gwetObjectTransformation,
    template
}