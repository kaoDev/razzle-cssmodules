# Razzle and CSS modules

This project is created with `create-razzle-app cssmodules-issue`.

Configuration is copied from https://github.com/facebookincubator/create-react-app/pull/2285/files

## Isuues

- https://github.com/jaredpalmer/razzle/issues/428
- https://github.com/webpack-contrib/css-loader/issues/231


### yarn build

https://github.com/webpack/webpack/issues/4268

```
yarn build
...
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.module.rules[4].use should be one of these:
   non-empty string | function | object { loader?, options?, query? } | function | [non-empty string | function | object { loader?, options?, query? }]
   Details:
    * configuration.module.rules[4].use should be a string.
    * configuration.module.rules[4].use should be an instance of function.
    * configuration.module.rules[4].use.loader should be a string.
    * configuration.module.rules[4].use should be one of these:
      non-empty string | function | object { loader?, options?, query? }
    * configuration.module.rules[4].use should be an instance of function.
    * configuration.module.rules[4].use should be an array:
      [non-empty string | function | object { loader?, options?, query? }]
```
