describe('String validator', () => {
    let StringValidator = require('../../validators/string-validator');
    let _ = require('lodash');
    let attribute = 'str';
    
    it('Valid value', (done) => {
        let value = 'string';
        let model = {};
        model[attribute] = value;
        let errors = {};
        let stringValidator = new StringValidator(attribute, {
            model,
            errors,
        });
        stringValidator
            .validate()
            .then(res => {
                expect(res).toBe(value);
                expect(errors[attribute]).toBeUndefined();
                done();
            })
            .catch(err => {});
    });

    it('Not a string value', (done) => {
        let value = 42;
        let model = {};
        model[attribute] = value;
        let errors = {};
        let stringValidator = new StringValidator(attribute, {
            model,
            errors,
        });
        stringValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' must be a string.');
                done();
            });
    });

    it('Too short string', (done) => {
        let value = 'short';
        let errors = {};
        let model = {};
        model[attribute] = value;
        let stringValidator = new StringValidator(attribute, {
            model,
            errors,
            min: 6,
        });
        stringValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' is too short.');
                done();
            });
    });

    it('Too long string', (done) => {
        let value = 'long';
        let errors = {};
        let model = {};
        model[attribute] = value;
        let stringValidator = new StringValidator(attribute, {
            model,
            errors,
            max: 3,
        });
        stringValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' is too long.');
                done();
            });
    });

    it('Exact length is equal', (done) => {
        let value = 'String';
        let errors = {};
        let model = {};
        model[attribute] = value;
        let stringValidator = new StringValidator(attribute, {
            model,
            errors,
            length: 6,
        });
        stringValidator
            .validate()
            .then(res => {
                expect(res).toBe(value);
                done();
            })
            .catch(err => {});
    });

    it('Exact length is not equal', (done) => {
        let value = 'String';
        let errors = {};
        let model = {};
        model[attribute] = value;
        let stringValidator = new StringValidator(attribute, {
            model,
            errors,
            length: 5,
        });
        stringValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' should contain 5 symbol(s).');
                done();
            });
    });
});
