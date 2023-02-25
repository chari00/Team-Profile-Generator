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

// TODO: Write Code to gather information about the development team members, and render the HTML file.
//create array of prompt question for each object {manager}, {engineer}, and {intern}
//add validation to ensure that user input is in the proper format.
startProgram();

async function startProgram() {
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
              console.log("Please enter a valid name.");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "employeeId",
          message: `What is the employee's ID number?`,
          validate: (employeeId) => {
            if (employeeId) {
              return true;
            } else {
              console.log("Employee ID is required.");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: `What is the employee's E-mail address?`,
          validate: (email) => {
            console.log("Please enter a valid email address.");
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
              email
            );
          },
        },
        {
          type: "input",
          name: "officeNumber",
          message: `What is the your office number?`,
          validate: (officeNumber) => {
            if (officeNumber) {
              return true;
            } else {
              console.log("Please enter employee office number.");
              return false;
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
      });
  teamManagerPrompt();
  // rolePromptMenu();
  //create prompt menu with options: add engineer, add intern, finish building the team.
  const rolePromptMenu = async () =>
    await inquirer
      .prompt({
        type: "list",
        name: "role",
        message: "Add role to build the team profile. ",
        choices: [
          "Add an Engineer",
          "Add an Intern",
          "Finish building the team",
        ],
      })
      .then((choices) => {
        console.log(JSON.stringify(choices.role));
        //if the user selected Engineer
        if (choices.role === "Add an Engineer") {
          return engineerPrompt();
        }
        //if the user selected Intern
        else if (choices.role === "Add an Intern") {
          return internPrompt();
        } else {
          // console.log("Finish building the team");
          rolePromptMenu();
        }
      });

  const engineerPrompt = inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the employee's name?`,
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: `What is the employee's ID number?`,
        validate: (employeeId) => {
          if (employeeId) {
            return true;
          } else {
            console.log("Employee ID is required.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: `What is the employee's E-mail address?`,
        validate: (email) => {
          console.log("Please enter a valid email address.");
          return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
            email
          );
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
    });

  const internPrompt = inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the employee's name?`,
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: `What is the your ID number?`,
        validate: (employeeId) => {
          if (employeeId) {
            return true;
          } else {
            console.log("ID is required.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: `What is the Intern E-mail address?`,
        validate: (email) => {
          console.log("Please enter a valid email address.");
          return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
            email
          );
        },
      },
      {
        type: "input",
        name: "schoolName",
        message: `What is the Intern school name?`,
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
    });
  // rolePromptMenu();

  //push the employee roles to team profile in htm file
  // team.push(new Manager("Chari", 56, "chari@gmail.com", 543));
  // team.push(
  //   new Engineer(
  //     answers.name,
  //     answers.employeeId,
  //     answers.email,
  //     answers.github
  //   )
  // );
  // team.push(
  //   new Intern(
  //     answers.name,
  //     answers.employeeId,
  //     answers.email,
  //     answers.schoolName
  //   )
  // );

  let htmlDoc = render(team);
  //function to dynamically create html file.
  await fs.writeFileSync(outputPath, htmlDoc);
}
