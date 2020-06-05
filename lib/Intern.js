// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
var Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  get getRole() {
    return "Intern";
  }
  get getSchool() {
    return this.school;
  }
}

module.exports = Intern;
