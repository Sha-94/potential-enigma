// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the name of your project?',
    validate: projectName => {
      if (projectName) {
        return true;
      } else {
        console.log('Please enter the name of your project!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Give a desciption of the project: ',
    validate: projectDesc => {
      if (projectDesc) {
        return true;
      } else {
        console.log('Please enter a description of your project!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'installationInstructions',
    message: 'List the installation instructions',
    validate: installationInst => {
      if (installationInst) {
        return true;
      } else {
        console.log('Please enter the installation instructions of your project!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What is the use case for this project? ',
    validate: usage => {
      if (usage) {
        return true;
      } else {
        console.log('Please enter the use case for this project!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'contributionGuidelines',
    message: 'What are the contribution guidelines ',
    validate: contributions => {
      if (contributions) {
        return true;
      } else {
        console.log('Please enter the contribution guidelines of your project!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'testInstructions',
    message: 'List the test instructions: ',
    validate: testInst => {
      if (testInst) {
        return true;
      } else {
        console.log('Please enter the test instructions of your project!');
        return false;
      }
    }
  },
  {
    type: 'checkbox',
    name: 'license',
    message: 'Which license is this project covered under?',
    choices: ['MIT License', 'GNU GPLv3' ,'GNU AGPLv3', 'GNU LGPLv3', 'The Unlicense', 'Boost Software License 1.0', 'Apache License 2.0', 'Mozilla Public License 2.0']
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your name!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your GitHub email:',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your email!');
        return false;
      }
    }
  }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./${fileName}`, data, err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
        ok: true,
        message: 'File created!'
      });
    });
  }); 
}

// TODO: Create a function to initialize app
function init() {
  promptUser()
  .then(results => {return writeToFile('README.MD', generateContent(results))})
  .catch(err => console.log(err));
}

function promptUser(){
  return inquirer.prompt(questions);
}

function generateContent(data){
  backtick = '```';
  console.log(data);
  return `
  # ${data.projectTitle}
  ## Description

  ${data.projectDescription}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  
  ## Installation
  \`\`\` sh
  ${data.installationInstructions}
  \`\`\`

  ## Usage 
  ${data.usage}

  ## Credits
  ${data.contributionGuidelines}

  ## License
  ${data.license}

  ## Tests
  ${data.testInstructions}

  ## Questions
  GitHub:  ![${data.github}](https://github.com/Sha-94)
  For any questions, feel free to reach out - Email: ${data.email}
    `;
}

// Function call to initialize app
init();

