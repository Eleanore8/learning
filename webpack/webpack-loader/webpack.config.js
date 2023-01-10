const path = require('path');
const CopyWebpackPlugin = require('./plugins/copy-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'loader1',
                    'loader2',
                    {
                        loader: 'loader3',
                        options: {
                            arg: 'options传参数'
                        }
                    }
                ]
            }
        ]
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loader')
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            from: 'public',
            to: 'css',
            toType: 'dir',
            ignore: [
              '**/index.html'
            ]
        })
    ]
};