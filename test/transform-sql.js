'use strict';

const {transformSql} = require('./../lib/backend');

describe('transform sql', () => {
  it('# normal', () => {
    transformSql({
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
    }).should.be.eql({data: 'CREATE TABLE data (id TEXT PRIMARY KEY, field TEXT NOT NULL UNIQUE)'});
  });
});
