// We need to 'use strict' here because this file isn't compiled with babel
/* eslint strict:0 */

'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// default the environment to development
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const appPath = path.join(__dirname, 'app');
const assetsPath = path.join(__dirname, 'public');
const publicPath = '/';

function getPlugins() {
  // These plugins are used in all environments
  const plugins = [

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),

    // http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ];

  // add plugins that should be used only in certain environments
  if (IS_PRODUCTION) {
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }));
  } else {
    // http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
}

function getLoaders() {
  const loaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // Don't use .babelrc. Use the specified config below with webpack
          babelrc: false,
          // This disables babel's transformation of ES2015 module syntax.
          // Doing so allows us to use Webpack 2's import system instead.
          // https://webpack.js.org/guides/migrating/
          presets: [['es2015', { modules: false }], 'stage-2', 'react'],
          plugins: ['transform-strict-mode', 'react-hot-loader/babel'],
        },
      },
    }, {
      test: /\.svg/,
      use: [{
        loader: 'svg-url-loader',
      }],
    }, {
      test: /(\.scss)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]',
            minimize: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
      }],
    },
  ];

  return loaders;
}

function getEntry() {
  const entry = [];

  // hot reload only when in non-production environment
  if (!IS_PRODUCTION) {
    // https://github.com/glenjamin/webpack-hot-middleware#config
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  // if TEST_APP then we build the test application, else the main one
  if (process.env.TEST_APP) {
    entry.push(path.join(appPath, 'test-app-index.js'));
  } else {
    entry.push(path.join(appPath, 'index.js'));
  }

  return entry;
}

function getOutput() {
  let output;

  // in production, we need a special output object
  if (IS_PRODUCTION) {
    output = {
      path: assetsPath,
      publicPath,
      filename: '[name]-[hash].min.js',
    };
  } else {
    output = {
      path: assetsPath,
      publicPath,
      filename: '[name].js',
    };
  }

  return output;
}

module.exports = {
  // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  target: NODE_ENV === 'test' ? 'node' : 'web',

  // enable cache in non-production environments
  cache: !IS_PRODUCTION,

  // anything but 'source-map breaks Chrome dev tools so we use source-map'
  // more info: https://webpack.github.io/docs/build-performance.html#sourcemaps
  devtool: 'source-map',

  resolve: {
    modules: [
      appPath,
      'node_modules',
    ],
  },

  plugins: getPlugins(),

  module: {
    rules: getLoaders(),
  },

  entry: getEntry(),

  output: getOutput(),

};
