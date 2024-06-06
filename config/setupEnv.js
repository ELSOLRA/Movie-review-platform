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

inquirer.prompt(userQuery).then((answer) => {
    const content = Object.entries(answer)
    .map(([key,value]) => `${key}=${value}`)
    .join('\n');
    
    fs.writeFileSync('.env', content);
    console.log('.env was created successfully!');
});

//npm install --save inquirer@^8.0.0

//npm run setup-env