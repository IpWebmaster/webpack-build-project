var path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
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
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "bundle.js"
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
            }
        ]
    },
    postcss: function () {
        return [require('postcss-import'), precss, autoprefixer({ browsers: ['last 2 versions', 'ie 8'] })];
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};