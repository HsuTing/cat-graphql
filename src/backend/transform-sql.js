'use strict';

import createCatDB from './create-cat-db';

export default data => {
  const obj = createCatDB(data);
  const output = {};

  Object.keys(obj).forEach(name => {
    output[name] = `CREATE TABLE ${name} (${
      Object.keys(obj[name]).map(field => {
        return `${field} ${obj[name][field]}`;
      }).join(', ')
    })`;
  });

  return output;
};
