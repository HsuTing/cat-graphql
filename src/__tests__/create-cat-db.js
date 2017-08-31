'use strict';

import {createCatDB} from './../backend';

describe('create cat db', () => {
  it('# normal', () => {
    expect(createCatDB({
      data: {
        id: {
          notNull: false,
          type: 'TEXT'
        }
      }
    })).toMatchObject({data: {id: 'TEXT'}});
  });

  it('# not null', () => {
    expect(createCatDB({
      data: {
        id: {
          notNull: true,
          type: 'TEXT'
        }
      }
    })).toMatchObject({data: {id: 'TEXT NOT NULL'}});
  });

  it('# add foreign key', () => {
    expect(createCatDB({
      data: {
        id: {
          notNull: false,
          type: 'TEXT',
          foreign: 'data'
        }
      }
    })).toMatchObject({data: {id: 'TEXT FOREIGN KEY REFERENCES data(id)'}});
  });

  it('# add check', () => {
    expect(createCatDB({
      data: {
        id: {
          notNull: false,
          type: 'TEXT',
          check: '[name] !== \'id\''
        }
      }
    })).toMatchObject({data: {id: 'TEXT CHECK (id !== \'id\')'}});
  });
});
