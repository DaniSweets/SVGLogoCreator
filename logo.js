const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'maxlength-input',
      name: 'text',
      message: 'What characters would you like inside your logo? (Up to 3)',
      maxLength: 3
    },
    {
      type: 'input',
      message: 'What color would you like the text to be?',
      name: 'textColor',
    },
    {
      type: 'list',
      message: 'Which shape would you like your logo to be?',
      name: 'shape',
      choices: ['circle', 'triangle', 'square'],
    },
    {
        type: 'input',
        message: 'What color would you like the logo to be?',
        name: 'shapeColor',
    }, 
  ])
  .then((data) => {
    const {text, textColor, shape, shapeColor} = data;
    if (shape == 'circle'){
      var shapeCode = `circle cx='120' cy='100' r='80'`;
    } else if (shape == 'square'){
      var shapeCode = `rect x='70' y='230' width='160' height='160'`;
    } else var shapeCode = `polygon points='0,200 150,0 300,200'`; 

    fs.writeFile('logo.svg', `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    <${shapeCode} fill="${shapeColor}" />
  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
  
    </svg>`
    , (err) => (err) ? console.error(err) : console.log('Creating your new logo!'))
    });