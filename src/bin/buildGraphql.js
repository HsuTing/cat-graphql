#!/usr/bin/env node
// @flow
'use strict';

import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

import core from './core/buildGraphql';

const {
  filePath,
  schema
}: {
  filePath: string,
  schema: string
} = core(process.argv.slice(2));
const store = memFs.create();
const fs = editor.create(store);

fs.write(filePath, schema);
fs.commit((
  err: Error
): void => {
  console.log(chalk.green('rendered ') + chalk.cyan(filePath));

  if(err)
    throw new Error(err);
});
