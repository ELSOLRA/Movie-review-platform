const inquirer = require('inquirer');
const fs = require('fs');

const userQuery = [
    {
        type: 'input',
        name: 'DATABASE_URI',
        message: 'Enter your database URI: ',
    },
    {
        type: 'input',
        name: 'JWT_SECRET',
        message: 'Enter your json web token secret password: ',
    },
    {
        type: 'list',
        name: 'URL',
        message: 'Choose url you want to use: ',
        choices: ['127.0.0.1', 'localhost'],
    },
    {
        type: 'input',
        name: 'PORT',
        message: 'Enter the port number your app will run on: ',
        default: '3000',
    },
];

// user prompt for input using Inquirer
inquirer.prompt(userQuery).then((answer) => {
// converting the answer object into an array
    const content = Object.entries(answer)
// maping each key-value pair to a string 
    .map(([key,value]) => `${key}=${value}`)
// joining all the strings with newline 
    .join('\n');
// writes content to .env    
    fs.writeFileSync('.env', content);
    console.log('.env was created successfully!');
});

//npm install --save inquirer@^8.0.0 for require, else ES6 import
