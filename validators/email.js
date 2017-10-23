const BaseValidator = require('./base-validator');
const validator = require('validator');

class Email extends BaseValidator
{
    init() {
        super.init();
        this.message = '{attribute} is not a valid email address.';
    }

    validateValue(value) {
        if (!validator.isEmail(value)) {
            return [this.message, {attribute: this.attribute}];
        }
    }
}

module.exports = Email;