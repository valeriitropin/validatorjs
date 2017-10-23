describe('Email validator', function() {
    let Email = require('../../validators/email');
    let validEmail = 'test@example.com';
    let invalidEmail = 'test@';
    let attribute = 'email';

    it('Valid email', () => {
        let model = {};
        model[attribute] = validEmail;
        let errors = {};
        let validator = new Email(attribute, {
            model,
            errors,
        });
        validator
            .validate()
            .then(res => {
                expect(res).toBe(validEmail);
                expect(errors[attribute]).toBeUndefined();
                done();
            })
            .catch(err => {});
    });

    it('Invalid email', (done) => {
        let model = {};
        model[attribute] = invalidEmail;
        let errors = {};
        let validator = new Email(attribute, {
            model,
            errors,
        });
        validator.validate().then(res => {}, err => {
            expect(errors[attribute][0]).toBe('{attribute} is not a valid email address.');
            done();
        });
    });
});
