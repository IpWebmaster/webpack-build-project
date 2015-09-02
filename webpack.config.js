var path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    postcssImport = require('postcss-import'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.join(__dirname,'frontend'),
    resolve: {
        modulesDirectories: ["node_modules","scripts", "stylesheets"],
        extensions: ["", ".js", ".css"]
    },
    entry: {
        app: ["./scripts/app.js", "./stylesheets/app.css"]
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "bundle.js",
        sourceMapFilename: "[file].map"
    },
    devServer: {
        contentBase: ".",
        inline: true,//Не понял
        watch: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader?sourceMap=true&sourceMapContents=true")
            }
        ]
    },
    postcss: function () {
        return [postcssImport({
            onImport: function (files) {
                files.forEach(this.addDependency);
            }.bind(this)
        }), precss, autoprefixer({ browsers: ['last 2 versions', 'ie 8'] })];
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};