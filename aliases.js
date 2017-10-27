const validators = require('./validators/index');

module.exports = {
    compare: validators.Compare,
    email: validators.Email,
    filter: validators.Filter,
    integer: validators.Integer,
    required: validators.Required,
    string: validators.StringValidator,
};