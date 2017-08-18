'use strict';

import path from 'path';
import callsite from 'callsite';

import getTable from './getTable';
import fieldsStrToObj from './fields-str-to-obj';
import transformType from './transformType';
import addForeign from './addForeign';

export default (
  schemaPath,
  typesConfigArray = [{
    ID: 'TEXT'
  }],
  excludeFields = []
) => {
  const typesConfig = typesConfigArray.reduce((config, data) => ({
    ...config, ...data
  }), {});
  const data = getTable(
    path.resolve(
      callsite()[1].getFileName(),
      './../',
      schemaPath
    ),
    excludeFields
  );

  fieldsStrToObj(data, excludeFields);
  transformType(data, typesConfig);
  addForeign(data, typesConfig.ID);

  const output = {};

  Object.keys(data).forEach(name => {
    output[name] = {...data[name].fields};
  });

  return output;
};
