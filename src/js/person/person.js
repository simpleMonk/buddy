
function Person(person){
    this.name = person.name;
    this.firstName = person.firstName;
    this.lastName= person.lastName;
}

Person.prototype.getFullName=function(){
    return this.firstName +" "+this.lastName;
};

module.exports = Person;