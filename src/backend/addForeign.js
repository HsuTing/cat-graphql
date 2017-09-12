'use strict';

import {getTypeConfig} from './transformType';

export default (data, IDConfig) => {
  if(!IDConfig)
    throw new Error('type "ID" is not defined');

  Object.keys(data).forEach(name => {
    // check if any custom type exist
    if(!data[name].fields)
      throw new Error(`type "${name}" is not defined`);

    // add foreign
    if(data[name].__parent__.length !== 0) {
      data[name].__parent__.forEach(({name: parentTableName, field: parentFieldName}) => {
        data[name].fields[`${parentTableName}_ID`] = getTypeConfig(
          IDConfig, {
            type: 'ID',
            foreign: parentTableName
          }
        );

        if(!data[parentTableName].fields.id) {
          data[parentTableName].fields.id = getTypeConfig(
            IDConfig, {
              allowNull: false,
              type: 'ID'
            }
          );
        }

        delete data[parentTableName].fields[parentFieldName];
      });
    }

    delete data[name].__parent__;
  });
};
