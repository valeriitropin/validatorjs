const BaseValidator = require('./base-validator');

class Integer extends BaseValidator
{
    init() {
        super.init();
        this.message = '{attribute} must be an integer number.';
        this.min = null;
        this.max = null;
        this.tooShort = '{attribute} must be no less than {min}.';
        this.tooLong = '{attribute} must be no greater than {max}.';
    }

    validateValue(value) {
        if (!(value === (value|0))) {
            return [this.message, {}];
        }

        if (this.min && value < this.min) {
            return [this.tooShort, {min: this.min}];
        }

        if (this.max && value > this.max) {
            return [this.tooLong, {max: this.max}]
        }
    }
}

module.exports = Integer;
