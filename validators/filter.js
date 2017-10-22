const BaseValidator = require('./base-validator');

class Filter extends BaseValidator
{
    init() {
        super.init();
        this.filter = undefined;
    }

    validateValue(value) {
        return Promise.resolve(this.filter(value));
    }
}

module.exports = Filter;