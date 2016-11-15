/*
* @Author: enzo
* @Date:   2016-11-14 00:07:55
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-14 00:32:15
*/

var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

webpackConfig = merge(webpackConfig,{
    entry : [
      '../app/demo/index.js'
    ],
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          optional: ['runtime'],
          stage: 2,
          env: {
            development: {
              plugins: [
                'react-transform'
              ],
              extra: {
                'react-transform': {
                  transforms: [{
                    transform:  'react-transform-hmr',
                    imports: ['react'],
                    locals:  ['module']
                  },
                  {
                    transform: 'react-transform-catch-errors',
                    imports: ['react','redbox-react' ]
                  }
                ]}
              }
            }
          }
        }
      },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]},
    plugins : [
      new webpack.HotModuleReplacementPlugin()
    ]  
});

module.exports = webpackConfig;