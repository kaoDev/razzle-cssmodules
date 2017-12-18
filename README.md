# Razzle and CSS modules

This project is created with `create-razzle-app razzle-cssmodules`.

Configuration is copied from https://github.com/facebookincubator/create-react-app/pull/2285/files

## Issues

- https://github.com/jaredpalmer/razzle/issues/428

```
yarn start
```

In the browser (http://localhost:3000)

```
proxyConsole.js:54 Warning: Prop `className` did not match. Server: "null" Client: "src-__Home-module___logo"
```

It seems that `isomorphic-style-loader` can solve this problem.
