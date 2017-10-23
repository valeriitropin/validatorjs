const BaseValidator = require('./base-validator');

class Compare extends BaseValidator
{
    init() {
        super.init();
        this.message = '{attribute} must be equal to "{compareAttribute}".';
        this.compareAttribute = null;
    }

    validateValue(value) {
        if (value !== this.model[this.compareAttribute]) {
            return [this.message, {attribute: this.attribute, compareAttribute: this.compareAttribute}];
        }
    }
}

module.exports = Compare;
