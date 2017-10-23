const validators = require('./validators/index');

module.exports = {
    compare: validators.Compare,
    email: validators.Email,
    filter: validators.Filter,
    required: validators.Required,
    string: validators.StringValidator,
};