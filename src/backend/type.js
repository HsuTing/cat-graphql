'use strict';

export const sqlite = {
  Int: 'INTEGER',
  String: 'TEXT',
  Boolean: {
    type: 'INTEGER',
    check: '[name] === 0 || [name] === 1'
  },
  Float: 'REAL',
  ID: 'TEXT'
};

export const postgresql = {
  Int: 'int',
  String: 'varchar',
  Boolean: 'bool',
  Float: 'float',
  ID: 'uuid'
};

export const sequelize = () => {
  const Sequelize = require('sequelize');

  return {
    Int: Sequelize.INTEGER,
    String: Sequelize.STRING,
    Boolean: Sequelize.BOOLEAN,
    Float: Sequelize.FLOAT,
    ID: Sequelize.UUID
  };
};
