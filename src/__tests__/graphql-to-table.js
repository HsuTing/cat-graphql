'use strict';

import {graphqlToTable, type} from './../backend';

const result = {
  data: {
    id: {
      allowNull: true,
      type: 'TEXT'
    }
  }
};

describe('graphql to table', () => {
  it('# normal', () => {
    expect(graphqlToTable(
      './schemas/normal.graphql'
    )).toMatchObject(result);
  });

  it('# add type config', () => {
    expect(graphqlToTable(
      './schemas/add-type-config.graphql',
      [{ID: 'TEXT'}]
    )).toMatchObject(result);
  });

  it('# add exclude fields', () => {
    expect(graphqlToTable(
      './schemas/add-exclude-fields.graphql',
      [type.sqlite],
      ['Skip']
    )).toMatchObject(result);
  });

  it('# use "enum"', () => {
    expect(graphqlToTable(
      './schemas/use-enum.graphql', [type.sqlite, {
        Enum: ({values}) => ({
          type: 'TEXT',
          check: values.map(d => `[name] === '${d}'`)
            .join(' OR ')
        })
      }]
    )).toMatchObject({
      data: {
        enum: {
          allowNull: true,
          type: 'TEXT',
          check: '[name] === \'RED\' OR [name] === \'BLUE\''
        }
      }
    });
  });

  it('# add foreign key', () => {
    expect(graphqlToTable(
      './schemas/add-foreign-key.graphql',
      [type.sqlite]
    )).toMatchObject({
      ...result,
      data_2: {
        id: {
          allowNull: false,
          type: 'TEXT'
        },
        data_ID: {
          foreign: 'data',
          type: 'TEXT'
        }
      },
      data_3: {
        data: {
          allowNull: true,
          type: 'TEXT'
        },
        data_2_ID: {
          foreign: 'data_2',
          type: 'TEXT'
        }
      }
    });
  });

  describe('# throw error', () => {
    it('## type "ID" is not defined', () => {
      expect(() => {
        graphqlToTable(
          './schemas/normal.graphql', [{
            String: 'TEXT'
          }]
        );
      }).toThrowError('type "ID" is not defined');
    });

    it('## type "Enum" is not defined', () => {
      expect(() => {
        graphqlToTable(
          './schemas/use-enum.graphql',
          [type.sqlite]
        );
      }).toThrowError('type "Enum" is not defined');
    });
  });
});

describe('type', () => {
  it('# sequelize', () => {
    expect(graphqlToTable(
      './schemas/normal.graphql',
      [type.sequelize()]
    )).toMatchObject({
      data: {
        id: {
          allowNull: true,
          type: 'ID'
        }
      }
    });
  });
});
