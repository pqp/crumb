const path = require('path');

module.exports = {
    entry: {
        crumb: './src/crumb.ts',
    },
    experiments: {
        outputModule: true,
    },
    output: {
        library: {
            type: 'module',
        },
        filename: 'crumb.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
};