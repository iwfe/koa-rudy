/*
* @Author: enzo
* @Date:   2016-11-14 00:07:55
* @Last Modified by:   enzo
* @Last Modified time: 2016-11-16 11:07:06
*/

var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var HappyPack = require('happypack');
// var happyThreadPool = HappyPack.ThreadPool({ size: 2 });


var webpackConfig = {
  output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js',
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
    entry : [
      path.join(__dirname,'./demo/client/index.js')
    ],
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    quiet: false,
    lazy: true,
    serverSideRender: true,
    devtool: 'source-map',
    stats: {
        colors: true
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