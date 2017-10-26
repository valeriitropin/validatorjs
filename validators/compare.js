const BaseValidator = require('./base-validator');
const _ = require('lodash');

class Compare extends BaseValidator
{
    init() {
        super.init();
        this.message = '{attribute} must be equal to "{compareAttribute}".';
        this.compareAttribute = null;
    }

    validateValue(value) {
        if (value !== this.model[this.compareAttribute]) {
            return [this.message, {compareAttribute: _.startCase(this.compareAttribute)}];
        }
    }
}

module.exports = Compare;
