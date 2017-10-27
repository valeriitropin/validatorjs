describe('Integer validator', () => {
    const Integer = require('../../validators/integer');
    const _ = require('lodash');
    let attribute = 'integerValue';
    let validValue = 42;
    let invalidValue = 'test';

    it('Is integer', (done) => {
        let model = {};
        let errors = {};
        model[attribute] = validValue;
        let integerValidator = new Integer(attribute, {
            model,
            errors
        });

        integerValidator
            .validate()
            .then(res => {
                expect(res).toBe(validValue);
                expect(errors[attribute]).toBeUndefined();
                done();
            })
            .catch(err => {});
    });

    it('Is not integer', (done) => {
        let model = {};
        let errors = {};
        model[attribute] = invalidValue;
        let integerValidator = new Integer(attribute, {
            model,
            errors
        });

        integerValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' must be an integer number.');
                done();
            });
    });

    it('Too big', (done) => {
        let model = {};
        let errors = {};
        let max = 10;
        model[attribute] = validValue;
        let integerValidator = new Integer(attribute, {
            model,
            errors,
            max,
        });

        integerValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' must be no greater than ' + max + '.');
                done();
            });
    });

    it('Too small', (done) => {
        let model = {};
        let errors = {};
        let min = 43;
        model[attribute] = validValue;
        let integerValidator = new Integer(attribute, {
            model,
            errors,
            min,
        });

        integerValidator
            .validate()
            .then(res => {})
            .catch(err => {
                expect(errors[attribute][0]).toBe(_.startCase(attribute) + ' must be no less than ' + min + '.');
                done();
            });
    });
});