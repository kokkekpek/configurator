const path = require('path');

module.exports = {
    entry: './index.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/i,
                loader: 'ts-loader',
                options: {
                    allowTsInNodeModules: true
                }
            }
        ]
    },
    mode: 'production'
};