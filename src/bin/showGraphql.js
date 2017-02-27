#!/usr/bin/env node
'use strict';

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';

const root = path.resolve(__dirname, './../../data');

fs.readdir(
  root,
  (err, files) => {
    if(err)
      throw new Error(err);

    const choices = [];
    files.forEach(file => {
      if(file.includes('.graphql'))
        choices.push(file);
    });

    inquirer.prompt([{
      type: 'checkbox',
      name: 'names',
      message: 'Choose names of graphql',
      choices
    }]).then(answers => {
      const {names} = answers;

      names.forEach(name => fs.readFile(
        path.resolve(root, name), 'utf8',
        (err, data) => {
          if(err)
            throw new Error(err);

          console.log(chalk.cyan(`\n# ${name}\n`));
          console.log(chalk.green(data));
        }
      ));
    });
  }
)
