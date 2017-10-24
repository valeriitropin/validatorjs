const _ = require('lodash');
module.exports = formatter;

function formatter(message, params) {
    for (let param in params) {
        message = message.replace(new RegExp('{' + param + '}', 'g'), _.startCase(params[param]));
    }
    return message;
}
