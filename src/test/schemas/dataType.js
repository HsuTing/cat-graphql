'use strict';

import {
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import {
  nodeDefinitions,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

const IntType = new GraphQLObjectType({
  name: 'IntType',
  fields: {
    data: {
      type: GraphQLInt
    }
  }
});

const floatType = new GraphQLObjectType({
  name: 'FloatType',
  fields: {
    data: {
      type: GraphQLFloat
    }
  }
});

export const {nodeInterface, nodeField} = nodeDefinitions(
  globalId => null,
  obj => null
);

const nodeType = new GraphQLObjectType({
  name: 'NodeType',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),
  }
});

const {connectionType: EdgesTypeConnection} =
  connectionDefinitions({nodeType});
const edgesType = new GraphQLObjectType({
  name: 'EdgesType',
  fields: {
    edges: {
      type: EdgesTypeConnection,
      args: connectionArgs,
      resolve: (faction, args) => connectionFromArray({}, args)
    }
  }
});

export default new GraphQLObjectType({
  name: 'data',
  fields: {
    clientMutationId: {
      type: GraphQLString
    },
    scalar: {
      type: new GraphQLScalarType({
        name: 'Scalar',
        serialize: value => null,
        parseValue: value => null,
        parseLiteral: ast => null
      })
    },
    union: {
      type: new GraphQLUnionType({
        name: 'Union',
        types: [IntType, floatType],
        resolveType: value => IntType
      })
    },
    enum: {
      type: new GraphQLEnumType({
        name: 'Enum',
        values: {
          RED: {value: 0},
          GREEN: {value: 1},
          BLUE: {value: 2}
        }
      })
    },
    list: {
      type: new GraphQLList(IntType)
    },
    id: {
      type: GraphQLID
    },
    boolean: {
      type: GraphQLBoolean
    },
    nonNull: {
      type: new GraphQLNonNull(IntType)
    },
    edges: {
      type: edgesType
    }
  }
});
