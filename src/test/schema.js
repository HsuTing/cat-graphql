'use strict';

import {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

const dataType = new GraphQLObjectType({
  name: 'data',
  fields: () => ({
    clientMutationId: {
      type: GraphQLString
    },
    data: {
      type: GraphQLString,
      description: 'data',
      resolve: root => root.data || ''
    }
  })
});

const inputType = new GraphQLInputObjectType({
  name: 'input',
  fields: () => ({
    clientMutationId: {
      type: GraphQLString
    },
    data: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'input data'
    }
  })
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
    fields: () => ({
      query
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'all mutations',
    fields: () => ({
      mutation
    })
  })
});
