const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require ('optimize-css-assets-webpack-plugin');
const ESlintWebpackPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.[contenthash:8].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'img',
                    limit: 8 * 1024,
                    esModule: false
                },
            },
            // 问题： url-loader是使用es6默认模块化解析；html-loader引入图片是commonJs，解析时会出问题[Object Module]
            // 解决： 关闭url-loader模块化解析，使用commonJs
            // 处理html文件内的图片
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome:'60'
                                }
                            }
                        ]
                    ],
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new ESlintWebpackPlugin({
            exclude: [
                resolve(__dirname, 'webpack.config.js')
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development',
    // mode: 'production',
    // 只会在内存中打包
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        // 压缩代码
        compress: true,
        hot: true,
        port: 3002
    },
    // 代码分割
    optimization: {
        // namedModules: true,
        splitChunks: {
           chunks: 'all',
        }
    },
    devtool: 'inline-source-map'
}