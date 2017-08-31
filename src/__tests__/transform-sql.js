'use strict';

import {transformSql} from './../backend';

describe('transform sql', () => {
  it('# normal', () => {
    expect(transformSql({
      data: {
        id: {
          notNull: false,
          type: 'TEXT',
          primary: true
        },
        field: {
          notNull: true,
          type: 'TEXT',
          unique: true
        }
      }
    })).toMatchObject({data: 'CREATE TABLE data (id TEXT PRIMARY KEY, field TEXT NOT NULL UNIQUE)'});
  });
});
