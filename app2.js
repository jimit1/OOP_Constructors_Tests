const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let q;
let employee;

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: `What is the name of the new employee`,
    },
    {
      type: "list",
      name: "role",
      message: "What is the role if the employee?",
      choices: ["Engineer", "Manager", "Intern"],
    },
  ])
  .then((res) => {
    if (res.role === "Engineer") {
      q = `What ${res.name}'s Github username?`;
      employee = new Engineer(res.name);
    } else if (res.role === "Manager") {
      q = `What is ${res.name}'s Office Number?`;
      employee = new Intern(res.name);
    } else {
      q = `What is ${res.name}'s School Name?`;
      employee = new Manager(res.name);
    }
    return res;
  })
  .then((res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: `What is the employee id of ${res.name}`,
        },
        {
          type: "input",
          name: "email",
          message: `What is the email of ${res.name}`,
        },
        {
          type: "input",
          name: "additional",
          message: `${q}`,
        },
      ])
      .then((res) => {
        employee.id = res.id;
        employee.email = res.email;
        console.log(employee.getRole);
        if (employee.getRole === "Engineer") {
          employee.github = res.additional;
        } else if (employee.getRole === "Manager") {
          employee.officeNumber === res.additional;
        } else {
          employee.school = res.additional;
        }
      })
      .then(() => render(employee));
  })
  .catch((err) => console.log(err));
