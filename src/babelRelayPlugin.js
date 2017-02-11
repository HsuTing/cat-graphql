'use strict';

import path from 'path';
import process from 'process';
import getbabelRelayPlugin from 'babel-relay-plugin';

const root = process.cwd();
const schema = require(path.resolve(root, './schema.json'));

module.exports = getbabelRelayPlugin(schema.data);
