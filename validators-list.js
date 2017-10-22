const Email = require('./validators/email');
const Filter = require('./validators/filter');
const Required = require('./validators/required');
const StringValidator = require('./validators/string-validator');

module.exports = {
    email: Email,
    filter: Filter,
    required: Required,
    string: StringValidator,
};