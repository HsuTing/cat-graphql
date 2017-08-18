'use strict';

import path from 'path';
import callsite from 'callsite';

import getTable from './getTable';
import fieldsStrToObj from './fields-str-to-obj';
import transformType from './transformType';
import addForeign from './addForeign';

export default (
  schemaPath = '',
  typesConfigArray = [],
  excludesFields = []
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
    excludesFields
  );

  fieldsStrToObj(data, excludesFields);
  transformType(data, typesConfig);
  addForeign(data, typesConfig.ID);

  return data;
};
