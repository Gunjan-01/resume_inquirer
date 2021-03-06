'use strict';

var inquirer = require('inquirer');
var chalk = require('chalk');

var response = chalk.bold.green;
var resume = require('./resume.json');

var resumePrompts = {
    type: 'list',
    name: 'resumeOptions',
    message: 'What do you want to know about me?',
    choices: [
        ...Object.keys(resume),
        'Exit'
    ]
};

function main() {
    console.log('Hey,My name is Gunjan and welcome to my resume');
    resumeHandler();
}

function resumeHandler() {
    inquirer.prompt(resumePrompts).then((ans) => {
        if (ans.resumeOptions == 'Exit') {
            return;
        }
        var option = ans.resumeOptions;
        console.log(response('--------------------------------------'));
        resume[`${option}`].forEach((info) => {
            console.log(response('|   => ' + info));
        });
        console.log(response('--------------------------------------'));

        inquirer.prompt({
            type: 'list',
            name: 'exitBack',
            message: 'Go back or Exit?',
            choices: ['Back', 'Exit']
        }).then((choice) => {
            if (choice.exitBack == 'Back') {
                console.clear();
                resumeHandler();
            } else {
                return;
            }
        });
    });
}

main();
