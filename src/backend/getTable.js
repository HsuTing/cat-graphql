'use strict';

import memFs from 'mem-fs';
import editor from 'mem-fs-editor';

const store = memFs.create();
const fs = editor.create(store);

const types = [
  'type',
  'interface',
  'scalar',
  'union',
  'enum'
];
let setting = {
  add: false,
  name: null
};

export default (schemaPath, excludeFields) => fs.read(schemaPath)
  .replace(/.*#.*\n/g, '') // remove description
  .split(/\n/) // split to line
  .reduce((fields, line) => {
    const [type, name, ...rest] = line.split(/ /);

    if(types.includes(type) && !excludeFields.includes(name) && rest.includes('{')) {
      setting = {
        add: true,
        name
      };
      fields[name] = {
        __parent__: [],
        type,
        fields: ''
      };
    } else if(line.includes('}')) {
      setting = {
        add: false,
        name: null
      }
    } else if(setting.add && setting.name && line !== '')
      fields[setting.name].fields += line.replace(/\s\s+/, ' ');

    return fields;
  }, {});
