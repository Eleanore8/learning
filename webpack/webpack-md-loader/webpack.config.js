// import { Configuration } from 'webpack'
const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    './loader/md-loader'
                ]
            }
        ]
    },
    mode: 'none'
};
module.exports = config;