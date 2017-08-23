'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import {createCatDB} from './../backend';

describe('create cat db', () => {
  it('# normal', () => {
    createCatDB({
      data: {
        id: {
          notNull: false,
          type: 'TEXT'
        }
      }
    }).should.be.eql({data: {id: 'TEXT'}});
  });

  it('# not null', () => {
    createCatDB({
      data: {
        id: {
          notNull: true,
          type: 'TEXT'
        }
      }
    }).should.be.eql({data: {id: 'TEXT NOT NULL'}});
  });

  it('# add foreign key', () => {
    createCatDB({
      data: {
        id: {
          notNull: false,
          type: 'TEXT',
          foreign: 'data'
        }
      }
    }).should.be.eql({data: {id: 'TEXT FOREIGN KEY REFERENCES data(id)'}});
  });

  it('# add check', () => {
    createCatDB({
      data: {
        id: {
          notNull: false,
          type: 'TEXT',
          check: '[name] !== \'id\''
        }
      }
    }).should.be.eql({data: {id: 'TEXT CHECK (id !== \'id\')'}});
  });
});
