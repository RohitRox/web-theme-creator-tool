const Path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Glob = require("glob");

const themeLinks = [];
const themes = [];

const entries = Glob.sync("./src/js/*.js").reduce((obj, file) => {
  const entry =  file.split('/').pop().split('.')[0];
  fPath = file.replace('src/' ,'');
  obj[entry] = fPath;
  themeLinks.push('<a href="'+entry+'.html">'+entry+'</a>');
  themes.push(entry);
  return obj
}, {});


module.exports = {
  "node": {
    "fs": "empty"
  },
  context: Path.resolve('./src/'),
  entry: entries,
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'javascripts/[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      Path.resolve('./node_modules'),
      Path.resolve('./src/js'),
      Path.resolve('./src/css')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ttf|otf)$/,
        loader: "url-loader",
        options: { limit: 40000, name: "fonts/[name].[ext]", publicPath: '../' }
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader: "url-loader",
        options: { limit: 40000, name: "images/[name].[ext]", publicPath: '../' }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false
              }
            },
            {loader: 'sass-loader'}
          ]
        })
      }
    ],
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'javascripts/commons.js',
      minChunks: 2,
    }),
    new ExtractTextPlugin({
      filename: 'stylesheets/[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
        hash: true,
        template: 'index.html',
        filename: 'index.html',
        themes: themeLinks
    })
  ].concat(
    themes.map((theme) => {
      return new HtmlWebpackPlugin({
        hash: true,
        chunks: ['commons', theme],
        template: 'layout.html',
        filename: theme+'.html'
      })
    })
  )
};
