#!/usr/bin/env node
'use strict';

import process from 'process';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

import core from './core/buildGraphql';

const {filePath, schema} = core(process.argv.slice(2));
const store = memFs.create();
const fs = editor.create(store);

fs.write(filePath, schema);
fs.commit(err => {
  console.log(chalk.green('rendered ') + chalk.cyan(filePath));

  if(err)
    throw new Error(err);
});
