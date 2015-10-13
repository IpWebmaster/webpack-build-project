'use strict';

/**
 * Development config
 */
module.exports = function(_path) {

    return {
        context: _path,
        debug: true,
        devtool: "source-map",
        devServer: {
            contentBase: ".",
            inline: true,//Не понял
            watch: true
        }
    }
};