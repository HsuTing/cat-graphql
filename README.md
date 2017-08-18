# Cat-graphql [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
Use to build `schema.graphql` for `babel-plugin-relay`.

## How to use
#### front end
###### RelayTypes
```js
import RelayTypes from 'cat-graphql';

groupFields: RelayTypes({
  fields: PropTypes.string.isRequired,
})

/*
This will be equal to:
groupFields: PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        fields: PropTypes.string.isRequired,
      }).isRequired
    })  
  ).isRequired
})
*/
```

#### back end
###### graphqlToTable
Use to transform graphql schema to a normal database table.
- Install: [callsite](https://www.npmjs.com/package/callsite)
```js
import {graphqlToTable} from 'cat-graphql/lib/backend';

graphqlToTable('./schema.graphql');
/*
input:
type data {
  id: ID
}

result:
{
  data: {
    id: {
      notNull: false,
      type: 'TEXT'
    }   
  }
}
*/
```
You can see other [examples](./test/graphql-to-table.js).

###### transformSql
Use to transform data from `graphqlToTable` to `sql`.

```js
import {transformSql} from 'cat-graphql/lib/backend';

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
});

/*
This will be equal to:
{
  data: 'CREATE TABLE data (id TEXT PRIMARY KEY, field TEXT NOT NULL UNIQUE)'
}
*/
```

#### bin
###### build-graphql
Use to build graphql schema for `babel-plugin-relay`.
```sh
build-graphql [arguments]
```
Arguments:
- `--path`, `-p`: Set the path of the output file.
- `--name`, `-n`: Set the name of the output file.
- `--schema`, `-s`: Set the source `schema` which is wrote by `graphql.js`.

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-graphql.svg
[npm-url]: https://www.npmjs.com/package/cat-graphql
[travis-image]: https://travis-ci.org/HsuTing/cat-graphql.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/cat-graphql
