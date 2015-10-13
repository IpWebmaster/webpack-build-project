'use strict';

var path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    postcssImport = require('postcss-import'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(_path) {
    return {
        context: path.join(_path, 'app'),
        resolve: {
            modulesDirectories: ["node_modules", "scripts", "stylesheets"],
            extensions: ["", ".js", ".css"]
        },
        entry: {
            app: ["./scripts/app.js", "./stylesheets/app.css"]
        },
        output: {
            path: path.join(_path, './dist'),
            filename: "main.js",
            sourceMapFilename: "[file].map"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader")
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                    loader: 'file?name=[path][name].[ext]',
                    exclude: /node_modules/
                }
            ]
        },
        postcss: function () {
            return [
                postcssImport({
                    onImport: function (files) {
                        files.forEach(this.addDependency);
                    }.bind(this)
                }),
                precss,
                autoprefixer({browsers: ['last 2 versions', 'ie 8']})
            ];
        },
        plugins: [
            new ExtractTextPlugin("ExtractTextPlugin", "[name].css")
        ]
    }
};