var Person = require("../../src/js/person/person.js");

describe('Simple module:Person', function () {

    it("should have a person constructor", function () {
        var person = new Person({name: 'senthil', firstName: 'Senthil', lastName: 'Kumar'});
        expect(person.name).to.equal('senthil');
        expect(person.firstName).to.equal('Senthil');
        expect(person.lastName).to.equal('Kumar');
    });

    it("should have a person prototype getFullName", function () {
        var person = new Person({firstName: 'Senthil', lastName: 'Kumar'});
        expect(person.getFullName()).to.equal('Senthil Kumar');
    });

});