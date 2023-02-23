const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
//create array of prompt question for each object {manager}, {engineer}, and {intern}
//add validation to ensure that user input is in the proper format.
let team = [];

startProgram();

async function startProgram() {
  //push the employee roles to team profile in htm file
  team.push(new Manager(this.name, this.id, this.email));
  team.push(new Engineer(this.name, this.id, this.email));
  team.push(new Intern(this.name, this.id, this.email));

  let htmlDoc = render(team);
  //function to dynamically create html file.
  //await fs.writeFile(outputPath, htmlDoc);
}
