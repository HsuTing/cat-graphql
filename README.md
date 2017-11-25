# Cat-graphql [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
Use to build `schema.graphql` for `babel-plugin-relay`, and other function with `graphql`.
You can see [examples](./src/__tests__/).

## How to use
#### front end
###### RelayTypes
```js
import relayTypes from 'cat-graphql';

groupFields: relayTypes({
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


#### bin
###### build-graphql
Use to build graphql schema for `babel-plugin-relay`.
```sh
build-graphql [schema path] [arguments]
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
