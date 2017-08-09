'use strict';

import {
  GraphQLNonNull
} from 'graphql';

export const addNonNull = fields => {
  const output = {};

  Object.keys(fields).forEach(key => {
    output[key] = {...fields[key]};
    output[key].type = new GraphQLNonNull(output[key].type);
  });

  return output;
};
