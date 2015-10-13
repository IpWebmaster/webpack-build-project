'use strict';

var _configs = {
    global: require(__dirname + '/config/global'),
    production: require(__dirname + '/config/env/production'),
    development: require(__dirname + '/config/env/development')
};

var _load = function(environment) {
    if (!environment) throw 'Can\'t find local environment variable via process.env.NODE_ENV';
    if (!_configs[environment]) throw 'Can\'t find environments see _config object';

    // load config file by environment
    return _configs && Object.assign(
        _configs[environment](__dirname),
        _configs['global'](__dirname)
    );
};

module.exports = _load(process.env.NODE_ENV);