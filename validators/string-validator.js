const BaseValidator = require('./base-validator');

class StringValidator extends BaseValidator
{
    init() {
        super.init();
        this.message = '{attribute} must be a string.';
        this.min = null;
        this.max = null;
        this.length = null;
        this.tooShort = '{attribute} is too short.';
        this.tooLong = '{attribute} is too long.';
        this.notEqual = '{attribute} should contain {length} symbol(s).';
    }

    validateValue(value) {
        if (typeof value !== 'string') {
            return [this.message, {attribute: this.attribute}];
        }

        if (this.min && value.length < this.min) {
            return [this.tooShort, {attribute: this.attribute}];
        }

        if (this.max && value.length > this.max) {
            return [this.tooLong, {attribute: this.attribute}];
        }

        if (this.length && value.length !== this.length) {
            return [this.notEqual, {attribute: this.attribute, length: this.length}];
        }
    }
}

module.exports = StringValidator;
