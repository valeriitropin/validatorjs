describe('Required validator', function() {
    let Required = require('../../validators/required');
    let attribute = 'required';

    it('Not empty attribute', (done) => {
        let value = true;
        let model = {};
        model[attribute] = value;
        let errors = {};
        let validator = new Required(attribute, {
            model,
            errors,
        });
        validator
            .validate()
            .then(res => {
                expect(res).toBe(value);
                expect(errors[attribute]).toBeUndefined();
                done();
            })
            .catch(err => {});
    });

    it('No attribute', (done) => {
        let model = {};
        let errors = {};
        let validator = new Required(attribute, {
            model,
            errors,
        });
        validator.validate().then(res => {}, err => {
            expect(errors[attribute][0]).toBe('{attribute} is required.');
            done();
        });
    });

    it('Empty attribute', done => {
        let model = {};
        model[attribute] = null;
        let errors = {};
        let validator = new Required(attribute, {
            model,
            errors,
        });
        validator.validate().then(res => {}, err => {
            expect(errors[attribute][0]).toBe('{attribute} is required.');
            done();
        });
    });
});
