#!/usr/bin/env node
'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';

const root = process.cwd();
const configPath = path.resolve(root, process.argv[2]);
const config = require(configPath);
const templatePath = path.resolve(__dirname, './../template/index.js');
const fileRoot = path.resolve(__dirname, './../../data');
const pluginsRoot = path.resolve(__dirname, './../../plugins');
const store = memFs.create();
const mem = editor.create(store);

Object.keys(config).forEach(name => {
  // write schema
  const schemaPath = path.resolve(root, config[name]);
  const schema = require(schemaPath).default || require(schemaPath);

  graphql(schema, introspectionQuery).then(result => {
    fs.writeFileSync(
      path.resolve(fileRoot, `${name}.json`),
      JSON.stringify(result, null, 2)
    );
  });

  fs.writeFileSync(
    path.resolve(fileRoot, `${name}.graphql`),
    printSchema(schema)
  );

  // write plugins
  mem.copyTpl(
    templatePath,
    path.resolve(pluginsRoot, `${name}.js`), {
      name
    }
  );

  mem.commit(err => {
    if(!err)
      throw new Error(err);
  });
});
