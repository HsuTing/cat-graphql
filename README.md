# Cat-graphql [![NPM version][npm-image]][npm-url]
Use for `babel-relay-plugin`.

## How to use
- Write config file, like `graphql.json`.
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

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-graphql.svg
[npm-url]: https://npmjs.org/package/cat-graphql
