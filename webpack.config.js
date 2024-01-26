const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    },
};