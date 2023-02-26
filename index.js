const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
let team = [];
let answers = "";

// TODO: Write Code to gather information about the development team members, and render the HTML file.
//create array of prompt question for each object {manager}, {engineer}, and {intern}
//add validation to ensure that user input is in the proper format.

const teamManagerPrompt = async () =>
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the employee's name?`,
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("\nPlease enter a valid name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: `What is the employee's ID number?`,
        validate: (employeeId) => {
          if (isNaN(employeeId)) {
            console.log("\nEmployee ID is required.");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: `What is the employee's E-mail address?`,
        validate: (email) => {
          if (
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
              email
            )
          ) {
            return true;
          } else {
            email = "";
            console.log("\nPlease enter a valid email address.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: `What is your office number?`,
        validate: (officeNumber) => {
          if (isNaN(officeNumber)) {
            console.log("\nPlease enter employee office number.");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers));
      team.push(
        new Manager(
          answers.name,
          answers.employeeId,
          answers.email,
          answers.officeNumber
        )
      );
      rolePromptMenu();
    });

//create prompt menu with options: add engineer, add intern, finish building the team.
const rolePromptMenu = async () =>
  await inquirer
    .prompt({
      type: "list",
      name: "role",
      message: "Add role to build the team profile. ",
      choices: ["Add an Engineer", "Add an Intern", "Finish building the team"],
    })
    .then((choices) => {
      console.log(JSON.stringify(choices.role));
      //if the user selected Engineer
      if (choices.role === "Add an Engineer") {
        engineerPrompt();
      }
      //if the user selected Intern
      else if (choices.role === "Add an Intern") {
        internPrompt();
      } else {
        //finished adding employees, render page.
        endProgram();
      }
    });

const engineerPrompt = async () =>
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the employee's name?`,
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("\nPlease enter a valid name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: `What is the employee's ID number?`,
        validate: (employeeId) => {
          if (isNaN(employeeId)) {
            console.log("\nEmployee ID is required.");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: `What is the employee's E-mail address?`,
        validate: (email) => {
          if (
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
              email
            )
          ) {
            return true;
          } else {
            email = "";
            console.log("\nPlease enter a valid email address.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: `What is the employee's GitHub username?`,
        validate: (github) => {
          if (github) {
            return true;
          } else {
            console.log("Please enter your GitHub username.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));
      team.push(
        new Engineer(
          answers.name,
          answers.employeeId,
          answers.email,
          answers.github
        )
      );
      rolePromptMenu();
    });

const internPrompt = async () =>
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the employee's name?`,
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("\nPlease enter a valid name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: `What is the employee's ID number?`,
        validate: (employeeId) => {
          if (isNaN(employeeId)) {
            console.log("\nEmployee ID is required.");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: `What is the employee's E-mail address?`,
        validate: (email) => {
          if (
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
              email
            )
          ) {
            return true;
          } else {
            email = "";
            console.log("\nPlease enter a valid email address.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "schoolName",
        message: `What is your school name?`,
        validate: (schoolName) => {
          if (schoolName) {
            return true;
          } else {
            console.log("Please enter your school name.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));
      team.push(
        new Intern(
          answers.name,
          answers.employeeId,
          answers.email,
          answers.schoolName
        )
      );
      rolePromptMenu();
    });

async function endProgram() {
  let htmlDoc = render(team);
  //function to dynamically create html file.
  await fs.writeFileSync(outputPath, htmlDoc);
}
teamManagerPrompt();
// rolePromptMenu();
// startProgram();
