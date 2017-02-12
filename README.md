# Cat-graphql [![NPM version][npm-image]][npm-url]
Build `schema.json`, `schema.graphql` and use for `babel-relay-plugin`.

## How to use
- Build `schema.json` and `schema.graphql`.
```sh
build-graphql [path of schema]
```

- Add plugin in `.babelrc`.
```
{
  "plugins": [
    "cat-graphql"
  ]
}
```

- Then, you can use to build components with `relay`.

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-graphql.svg
[npm-url]: https://npmjs.org/package/cat-graphql
