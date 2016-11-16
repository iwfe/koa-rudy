/*
* @Author: enzo
* @Date:   2016-11-14 00:07:55
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 15:21:30
*/

var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  output: {
        path: path.join(__dirname,'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
  },
  plugins: [
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin("[name].css"),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          minChunks: Infinity
      })
  ]
};

webpackConfig = merge(webpackConfig,{
    entry : {
      'index': path.join(__dirname,'./demo/client/index.js')
    },
    
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules)|(global\/lib\/)/,
            loader: 'babel-loader',
            happy: { id: 'js' }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'happypack/loader?id=css')
        },{
            test: /\.rcss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&-convertValues!sass-loader?sourceMap')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-convertValues!less-loader')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-convertValues!sass-loader?sourceMap')
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
        }, {
            test: /\.html/,
            loader: "html-loader?" + JSON.stringify({
                minimize: false,
                attrs:false
            })
        },
            {
             test: /\.json$/,
             loader: "json"
            }
        ]
    }
});

module.exports = webpackConfig;