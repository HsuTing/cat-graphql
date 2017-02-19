'use strict';

import path from 'path';
import getbabelRelayPlugin from 'babel-relay-plugin';

const root = path.resolve(__dirname, './../data');
const schema = require(path.resolve(root, './<%= name %>.json'));

module.exports = getbabelRelayPlugin(schema.data);
