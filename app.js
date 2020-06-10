const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let q = "";
let employee = {};
const employeeArray = [];
let htmlFile = "";

const createEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the name of the new employee`,
        validate: checkName,
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
        q = `What is ${res.name}'s Github username?`;
        employee = new Engineer(res.name);
      } else if (res.role === "Manager") {
        q = `What is ${res.name}'s Office Number?`;
        employee = new Manager(res.name);
      } else {
        q = `What is ${res.name}'s School Name?`;
        employee = new Intern(res.name);
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
            validate: checkId,
          },
          {
            type: "input",
            name: "email",
            message: `What is the email of ${res.name}`,
            validate: checkAnswer,
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
          if (employee.getRole === "Engineer") {
            employee.github = res.additional;
          } else if (employee.getRole === "Manager") {
            employee.officeNumber = res.additional;
          } else {
            employee.school = res.additional;
          }
          employeeArray.push(employee);
          renderEmployees();
        });
    })
    .catch((err) => console.log(err));
};

const renderEmployees = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Do you want to add employee and their info?",
      },
    ])
    .then((res) => {
      if (res.confirm) {
        createEmployee();
      } else {
        htmlFile = render(employeeArray);
        fs.writeFile(outputPath, htmlFile, (err) => {
          if (err) {
            throw err;
          } else {
            console.log("Saved the html file with all employees");
          }
        });
      }
    });
};

const checkAnswer = (input) => {
  if (input.includes("@") && input.includes(".")) {
    return true;
  } else {
    return "Email is in incorrect format";
  }
};

const checkId = (input) => {
  if (isNaN(parseInt(input))) {
    return "ID should be a number";
  } else {
    return true;
  }
};

const checkName = (input) => {
  if (input === "") {
    return "Please enter a valid name";
  } else {
    return true;
  }
};

renderEmployees();
