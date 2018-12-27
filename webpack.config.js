const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: "development",
  entry: [
    __dirname + "/src/index.ts"
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: false
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "test.bundle.js"
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      files: {
        js: ['src/index.js'],
        chunks: {
            head: {
                entry: "src/index.js",
                css: [ ]
            }
        }
      },
      template: "src/assets/index.html"
    }),
    new CopyWebpackPlugin([{
      from: './src/assets/imgs',
      to: './imgs'
    }])
  ]
};
