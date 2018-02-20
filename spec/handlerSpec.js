var createEvent = require('../handler').createEvent;

async function readFromFS(filename) {
    let filePtr = require('fs');
    let util = require('util');
    const readFileAsync = util.promisify(filePtr.readFile);
    return await readFileAsync(filename);
}

describe("Event Object parsing", function () {
    var event = {};
    var context = {};
    var filename = './assets/sample-event.xml';
    it("Event Object created", function () {
        readFromFS(filename).then(function (xmlContent) {
            function callback(err, response) {
                expect(response.body.input.event.event_id).toBe('1402180001');
                expect(response.body.input.event.event_name).toBe('GWET Deployment');
            }
            event.body = xmlContent;
            createEvent(event, context, callback);
        });
    });
});