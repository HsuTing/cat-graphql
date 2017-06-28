'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babelRelayPlugin = require('babel-relay-plugin');

var _babelRelayPlugin2 = _interopRequireDefault(_babelRelayPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _path2.default.resolve(__dirname, './../data');
var schema = require(_path2.default.resolve(root, './schema.json'));

module.exports = (0, _babelRelayPlugin2.default)(schema.data);