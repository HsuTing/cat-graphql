'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import {transformSql} from './../backend';

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
