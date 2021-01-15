const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const renderInput = require("inquirer/lib/objects/choices");
const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "Enter the manager's ID number.",
            name: "managerId"
        },
        {
            type: "input",
            message: "Enter the manager's email address.",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Enter the manager's office number.",
            name: "managerOffice"
        }
    ]).then(response => {
        const newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice);
        team.push(newManager);
        addMember();
    })
}

function addMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add another team member?",
            choices: [
                "Add Manager", 
                "Add Engineer", 
                "Add Intern", 
                "Done"
            ],
            name: "choice"
        }
    ]).then(response => {
        switch (response.choice) {
            case "Add Manager":
                addManager();
                break;
            case "Add Engineer":
                addEngineer();
                break;
            case "Add Intern":
                addIntern();
                break;
            default:
                done();
        }   
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "Enter your enginner's ID number.",
            name: "engineerId"
        },
        {
            type: "input",
            message: "Enter your engineer's email address.",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "Enter your engineer's GitHub username.",
            name: "github"
        }
    ]).then(response => {
        const newEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github);
        team.push(newEngineer);
        addMember();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "internName"
        },
        {
            type: "input",
            message: "Enter the intern's ID number.",
            name: "internId"
        },
        {
            type: "input",
            message: "Enter the intern's email address.",
            name: "internEmail"
        },
        {
            type: "input",
            message: "Enter the intern's school.",
            name: "school"
        }
    ]).then(response => {
        const newIntern = new Intern(response.internName, response.internId, response.internEmail, response.school);
        team.push(newIntern);
        addMember();
    })
}

function done() {
    fs.writeFileSync(outputPath, render(team));
    console.log("All done!");
}

addManager();