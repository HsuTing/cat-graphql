'use strict';

import path from 'path';
import process from 'process';
import {printSchema} from 'graphql/utilities';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const root = process.cwd();

export default argvArray => new Promise((resolve, reject) => {
  // default config
  let schemaPath = './schema';
  let filePath = './';
  let name = 'schema';

  const store = memFs.create();
  const fs = editor.create(store);
  const nextArgv = (argv, index) => {
    if(index + 1 >= argvArray.length)
      reject('This value of the argument is not defined.');

    return argvArray[index + 1];
  };

  // get config
  argvArray.forEach((argv, index) => {
    switch(argv) {
      case '--path':
      case '-p':
        filePath = nextArgv(argv, index);
        break;

      case '--name':
      case '-n':
        name = nextArgv(argv, index);
        break;

      case '--schema':
      case '-s':
        schemaPath = nextArgv(argv, index);
        break;

      default:
        if(index >= 2 && (/-/).test(argv))
          reject(`${argv} is not in the argument list.`);
    }
  });

  // write schema
  const realSchemaPath = path.resolve(root, schemaPath);
  const realFilePath = path.resolve(root, filePath, `${name}.graphql`);
  const schema = require(realSchemaPath).default;

  fs.write(
    realFilePath,
    printSchema(schema)
  );

  fs.commit(() => {
    console.log(chalk.green('rendered ') + chalk.cyan(realFilePath));
    resolve();
  });
});
