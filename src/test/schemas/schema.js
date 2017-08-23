'use strict';

import {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

import dataType, {nodeField} from './dataType';

const inputType = new GraphQLInputObjectType({
  name: 'input',
  fields: {
    clientMutationId: {
      type: GraphQLString
    },
    data: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'input data'
    }
  }
});

const query = {
  type: dataType,
  description: 'index query',
  args: {
    input: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: () => ({data: 'query'})
};

const mutation = {
  type: dataType,
  description: 'index mutation',
  args: {
    input: {
      type: new GraphQLNonNull(inputType)
    }
  },
  resolve: () => ({data: 'mutation'})
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'all queries',
    fields: {
      node: nodeField,
      query
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'all mutations',
    fields: {
      mutation
    }
  })
});
