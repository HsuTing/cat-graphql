'use strict';

const backend = require('./../lib/backend');
const {graphqlToTable} = backend;
const result = {
  data: {
    fields: {
      id: {
        notNull: false,
        type: 'TEXT'
      }
    }
  }
};

describe(' graphql-to-table', () => {
  it('# normal', () => {
    graphqlToTable(
      './schemas/normal.graphql'
    ).should.be.eql(result);
  });

  it('# add type config', () => {
    graphqlToTable(
      './schemas/add-type-config.graphql',
      [{ID: 'TEXT'}]
    ).should.be.eql(result);
  });

  it('# add exclude fields', () => {
    graphqlToTable(
      './schemas/add-exclude-fields.graphql',
      [backend.type.sqlite],
      ['Skip']
    ).should.be.eql(result);
  });

  it('# use "enum"', () => {
    graphqlToTable(
      './schemas/use-enum.graphql', [backend.type.sqlite, {
        Enum: ({values}) => ({
          type: 'TEXT',
          check: values.map(d => `[name] === '${d}'`)
            .join(' || ')
        })
      }]
    ).should.be.eql({
      data: {
        fields: {
          enum: {
            notNull: false,
            type: 'TEXT',
            check: '[name] === \'RED\' || [name] === \'BLUE\''
          }
        }
      }
    });
  });

  it('# add foreign key', () => {
    graphqlToTable(
      './schemas/add-foreign-key.graphql',
      [backend.type.sqlite]
    ).should.be.eql(Object.assign({}, result, {
      data_2: {
        fields: {
          id: {
            notNull: true,
            type: 'TEXT'
          },
          data_ID: {
            foreign: 'data',
            type: 'TEXT'
          }
        }
      },
      data_3: {
        fields: {
          data: {
            notNull: false,
            type: 'TEXT'
          },
          data_2_ID: {
            foreign: 'data_2',
            type: 'TEXT'
          }
        }
      }
    }));
  });

  describe('# throw error', () => {
    it('## type "ID" is not defined', () => {
      (() => {
        graphqlToTable(
          './schemas/normal.graphql', [{
            String: 'TEXT'
          }]
        );
      }).should.be.throw('type "ID" is not defined');
    });

    it('## type "Enum" is not defined', () => {
      (() => {
        graphqlToTable(
          './schemas/use-enum.graphql',
          [backend.type.sqlite]
        );
      }).should.be.throw('type "Enum" is not defined');
    });
  });
});
