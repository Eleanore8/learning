// import { Configuration } from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devtool: 'source-map',
    mode: 'none'
};
module.exports = config;