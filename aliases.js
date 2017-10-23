const validators = require('./validators/index');

module.exports = {
    email: validators.Email,
    filter: validators.Filter,
    required: validators.Required,
    string: validators.StringValidator,
};