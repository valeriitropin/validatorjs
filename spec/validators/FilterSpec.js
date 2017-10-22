describe('Filter', function() {
    let Filter = require('../../validators/filter');
    let attribute = 'notFiltered';

    it('Filter', (done) => {
        let value = '   Test   ';
        let model = {};
        model[attribute] = value;
        let errors = {};
        let validator = new Filter(attribute, {
            model,
            errors,
            filter: value => value.trim(),
        });
        validator
            .validate()
            .then(res => {
                expect(res).toBe(value.trim());
                done();
            })
            .catch(err => {});
    });
});
