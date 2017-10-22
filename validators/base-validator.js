const _ = require('lodash');

class BaseValidator
{
    constructor(attribute, options) {
        this.init();
        _.assignIn(this, _.pick(options, _.keysIn(this)));
        this.attribute = attribute;
    }

    init() {
        this.model = null;
        this.errors = null;
        this.message = null;
        this.skipOnError = true;
    }

    addError(message) {
        if (!this.errors[this.attribute]) {
            this.errors[this.attribute] = [];
        }
        this.errors[this.attribute].push(message);
    }

    validate(value) {
        value = value || this.model[this.attribute];
        let result;
        if (result = this.validateValue(value)) {
            if (result instanceof Promise) {
                return result.catch(err => {
                        if (err instanceof Error) {
                            return Promise.reject(err);
                        }
                        this.addError(err);
                        if (this.skipOnError) {
                            return Promise.reject();
                        }
                    });
            }
            this.addError(result[0]);
            if (this.skipOnError) {
                return Promise.reject();
            }
        }
        return Promise.resolve(value);
    }

    validateValue(value) {
        throw Error('You should implement this method before usage');
    }

    hasErrors() {
        return this.errors[this.attribute] !== undefined;
    }
}

module.exports = BaseValidator;
