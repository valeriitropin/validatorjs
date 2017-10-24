const BaseValidator = require('./validators/base-validator');
const _ = require('lodash');

module.exports = function (options) {
    options = options || {};
    let aliases = options.aliases || require('./aliases');
    let formatter = options.formatter || require('./formatter');

    return validate;

    function validate(data, rules) {
        const promisesList = [];
        const validationErrors = {};
        const errors = [];
        const result = {};
        const validatedFields = extractValidatedFields(rules);
        const validators = initValidators(validatedFields, rules, data, validationErrors);

        for (let name in validators) {
            let fieldValidators = validators[name];
            let promise = Promise.resolve(data[name]);
            for (let validator of fieldValidators) {
                promise = promise.then(res => validator.validate(res));
            }

            promisesList.push(
                promise
                    .then(res => result[name] = res)
                    .catch(err => {
                        if (err instanceof Error) {
                            return errors.push(err);
                        }
                    })
            );
        }

        return Promise.all(promisesList)
            .then(res => {
                if (errors.length) {
                    return Promise.reject(errors[0]);
                }
                if (!_.isEmpty(validationErrors)) {
                    return Promise.reject(validationErrors);
                }
                return Promise.resolve(result);
            });
    }

    function extractValidatedFields(rules) {
        const validatedFields = {};
        for (rule of rules) {
            if (Array.isArray(rule[0])) {
                for (fieldName of rule[0]) {
                    validatedFields[fieldName] = [];
                }
            } else {
                validatedFields[rule[0]] = [];
            }
        }
        return validatedFields;
    }

    function initValidators(validatedFields, rules, data, errors) {
        for (rule of rules) {
            let options = rule[2] || {};
            options['model'] = data;
            options['errors'] = errors;
            options['formatter'] = formatter;
            if (Array.isArray(rule[0])) {
                let ruleName = rule[1];
                for (let attribute of rule[0]) {
                    validatedFields[attribute].push(createValidator(ruleName, attribute, options));
                }
            } else {
                validatedFields[rule[0]].push(createValidator(rule[1], rule[0], options));
            }
        }
        return validatedFields;
    }

    function createValidator(name, attribute, options) {
        options = options || {};
        let validator;
        if (name instanceof BaseValidator) {
            validator = ruleName;
            validator.attribute = attribute;
        } else if(typeof name === 'function') {
            options['callback'] = name;
            validator = new aliases['inline'](attribute, options);
        } else {
            validator = new aliases[name](attribute, options);
        }
        return validator;
    }
};
