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
            app: ["./scripts/app.js", "./stylesheets/app.css"],
            core: ["./stylesheets/core.css"]
        },
        output: {
            path: path.join(_path, 'dist'),
            publicPath: '/dist/',
            filename: "bundle.js",
            sourceMapFilename: "[file].map"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader")
                },
                {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
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