describe('Compare validator', function() {
    let Compare = require('../../validators/compare');
    let attribute = 'password';
    let compareAttribute = 'comparePassword';

    it('Values compare', () => {
        let model = {};
        model[attribute] = 'somepswrd';
        model[compareAttribute] = 'somepswrd';
        let errors = {};
        let validator = new Compare(attribute, {
            model,
            errors,
            compareAttribute: compareAttribute,
        });
        validator
            .validate()
            .then(res => {
                expect(res).toBe('somepswrd');
                expect(errors[attribute]).toBeUndefined();
                done();
            })
            .catch(err => {});
    });

    it('Values don\'t compare', (done) => {
        let model = {};
        model[attribute] = 'somepaswrd';
        model[compareAttribute] = 'somepaswr';
        let errors = {};
        let validator = new Compare(attribute, {
            model,
            errors,
            compareAttribute: compareAttribute,
        });
        validator.validate().then(res => {}, err => {
            expect(errors[attribute][0]).toBe('{attribute} must be equal to "{compareAttribute}".');
            done();
        });
    });
});
