#!/usr/bin/env node
'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';

const root = process.cwd();
const schema = require(path.resolve(root, process.argv[2]));

graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    path.resolve(root, 'schema.json'),
    JSON.stringify(result, null, 2)
  );
});

fs.writeFileSync(
  path.resolve(root, 'schema.graphql'),
  printSchema(schema)
);
