# Cat-graphql [![NPM version][npm-image]][npm-url]
Use for `babel-relay-plugin`.

## How to use
- Write config file, like `graphql.json`. [Here](./test/graphql.json) is example.
```javascript
{
  "pluginName": "/PATH/TO/SCHEMA"
}
```

- Run script.
```sh
build-graphql [path of cofig file]
```

- Add plugin in `.babelrc`.
```
{
  "plugins": [
    "cat-graphql/plugins/pluginName"
  ]
}
```

- Then, you can use to build components with `relay`.

## Show graphql
- After you build plugins, you can use `show-graphql` to read `graphql`.
```sh
show-graphql
```

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-graphql.svg
[npm-url]: https://npmjs.org/package/cat-graphql
