"use strict";

const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = Object.assign({}, config);
    const isServer = target !== "web";

    // Options for PostCSS as we reference these options twice
    // Adds vendor prefixing to support IE9 and above
    const postCSSLoaderOptions = {
      ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
      plugins: () => [
        require("postcss-flexbugs-fixes"),
        autoprefixer({
          browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9" // React doesn't support IE8 anyway
          ],
          flexbox: "no-2009"
        })
      ]
    };

    const extractTextPluginOptions = {};

    if (dev) {
      appConfig.module.rules = appConfig.module.rules.map(rule => {
        if (rule.test && !!".css".match(rule.test)) {
          return {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: isServer
              ? [
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 1
                    }
                  }
                ]
              : [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      importLoaders: 1
                    }
                  },
                  {
                    loader: "postcss-loader",
                    options: postCSSLoaderOptions
                  }
                ]
          };
        }
        return rule;
      });

      appConfig.module.rules.push({
        test: /\.module\.css$/,
        use: isServer
          ? [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: "[path]__[name]___[local]"
                }
              }
            ]
          : [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: "[path]__[name]___[local]"
                }
              },
              {
                loader: "postcss-loader",
                options: postCSSLoaderOptions
              }
            ]
      });
    } else {
      appConfig.module.rules = appConfig.module.rules.map(rule => {
        if (rule.test && !!".css".match(rule.test)) {
          return {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: {
              loader: ExtractTextPlugin.extract({
                fallback: {
                  loader: require.resolve("style-loader"),
                  options: {
                    hmr: false
                  }
                },
                use: [
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1
                    }
                  },
                  {
                    loader: require.resolve("postcss-loader"),
                    options: postCSSLoaderOptions
                  }
                ]
              })
            }
          };
        }
        return rule;
      });

      appConfig.module.rules.push({
        test: /\.module\.css$/,
        use: {
          loader: ExtractTextPlugin.extract({
            fallback: {
              loader: require.resolve("style-loader"),
              options: {
                hmr: false
              }
            },
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: "[path]__[name]___[local]"
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: postCSSLoaderOptions
              }
            ]
          })
        }
      });

      appConfig.plugins.push(
        new ExtractTextPlugin("static/css/[name].[contenthash:8].css")
      );
    }

    loader: return appConfig;
  }
};