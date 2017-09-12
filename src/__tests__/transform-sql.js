'use strict';

import {transformSql} from './../backend';

describe('transform sql', () => {
  it('# normal', () => {
    expect(transformSql({
      data: {
        id: {
          allowNull: true,
          type: 'TEXT',
          primaryKey: true
        },
        field: {
          allowNull: false,
          type: 'TEXT',
          unique: true
        }
      }
    })).toMatchObject({data: 'CREATE TABLE data (id TEXT PRIMARY KEY, field TEXT NOT NULL UNIQUE)'});
  });

  it('# add foreign key', () => {
    expect(transformSql({
      data: {
        id: {
          allowNull: true,
          type: 'TEXT',
          foreign: 'data'
        }
      }
    })).toMatchObject({data: 'CREATE TABLE data (id TEXT FOREIGN KEY REFERENCES data(id))'});
  });

  it('# add check', () => {
    expect(transformSql({
      data: {
        id: {
          allowNull: true,
          type: 'TEXT',
          check: '[name] !== \'id\''
        }
      }
    })).toMatchObject({data: 'CREATE TABLE data (id TEXT CHECK (id !== \'id\'))'});
  });
});
