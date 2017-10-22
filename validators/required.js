const BaseValidator = require('./base-validator');

class Required extends BaseValidator
{
    init() {
        super.init();
        this.message = '{attribute} is required.';
    }

    validateValue(value) {
        if (value === undefined || value === null) {
            return [this.message, {'attribute': this.attribute}];
        }
    }
}

module.exports = Required;
