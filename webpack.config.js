const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    //'webpack/hot/poll?1000',
    './src/index.ts'
  ],
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist'
  },
  watch: true,
  devtool: 'source-map',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  mode: 'development',
  resolve: {
    modules: ['./src', 'node_modules'],
    extensions: ['.ts', '.js', '.json']
  },
  externals: [
    nodeExternals()
    //{ whitelist: ['webpack/hot/poll?1000'] }
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        exclude: ['./node_modules']
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new WebpackCleanupPlugin(),
    //new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server')
      }
    })
  ]
};
