'use strict';

import Koa from 'koa';
import mount from 'koa-mount';
import convert from 'koa-convert';
import graphql from 'koa-graphql';

import schema from './schema';

const app = new Koa();

app.use(mount('/graphql', convert(graphql({
  schema,
  graphiql: true,
  pretty: true,
  formatError: error => {
    console.log(error);
    return error;
  }
}))));

app.listen(8000, () => {
  console.log('server start');
});
