var moment = require('moment');
var config = require('config').get('system');
var _ = require('lodash');

var LOG_LEVEL = config.get('log_level');

var consolelog = {
    debug: log(console.log, 'debug', objectFormatter, momentFormatter),
    info: log(console.log, 'info', objectFormatter, momentFormatter ),
}

function momentFormatter ( msg ) {
    return `[${moment().format()}] : ${msg}`
}

function objectFormatter ( msg ) {
    return typeof msg == 'object' ? JSON.stringify(msg): msg
}

function log(logger, logLevel, ...formatters){
    if (LOG_LEVEL === logLevel){
        return function (msg){
            var newMsg = msg;
            _.forEach(formatters, function (formatter) {
                newMsg = formatter(newMsg)
            });
            logger(`${newMsg}`);
        }
    }else {
        return function (msg) {}
    }
}

module.exports = {
    consolelog
}
