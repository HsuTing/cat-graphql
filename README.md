# Cat-graphql [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
Use to build `schema.graphql` for `babel-plugin-relay`.

## How to use
```js
// RelayTypes
import RelayTypes from 'cat-graphql';

static propTypes = {
  groupFields: RelayTypes({
    fields: PropTypes.string.isRequired,
  })
}

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

// addNonNull
import {addNonNull} from 'cat-graphql/lib/utils';

addNonNull({
  test: {
    type: GraphQLString,
    description: 'Test'
  }   
})

/*
This will be equal to:
test: {
  type: new GraphQLNonNull(GraphQLString),
  description: 'Test'
}
*/
```

#### build-graphql
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
