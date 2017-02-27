#!/usr/bin/env node
'use strict';

import path from 'path';
import process from 'process';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const root = process.cwd();
const configPath = path.resolve(root, process.argv[2]);
const config = require(configPath);
const templatePath = path.resolve(__dirname, './../template/index.js');
const fileRoot = path.resolve(__dirname, './../../data');
const pluginsRoot = path.resolve(__dirname, './../../plugins');
const store = memFs.create();
const fs = editor.create(store);

Object.keys(config).forEach(name => {
  // write schema
  const schemaPath = path.resolve(root, config[name]);
  const schema = require(schemaPath).default || require(schemaPath);

  graphql(schema, introspectionQuery).then(result => {
    fs.writeJSON(
      path.resolve(fileRoot, `${name}.json`),
      result,
      null,
      2
    );
  });

  fs.write(
    path.resolve(fileRoot, `${name}.graphql`),
    printSchema(schema)
  );

  // write plugins
  fs.copyTpl(
    templatePath,
    path.resolve(pluginsRoot, `${name}.js`), {
      name
    }
  );

  fs.commit(err => {
    if(err)
      throw new Error(err);

    console.log(chalk.green('rendered ') + chalk.cyan(`cat-graphql/plugins/${name}`));
  });
});
