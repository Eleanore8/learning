const { resolve, join }  = require('path');

module.exports = {
    entry: './test/testDirective.js',
    // entry: './src/directive/index.js',
    output: {
        publicPath: '/xuni/',
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        // 静态资源文件管理
        contentBase: 'public',
        port: 8081
    }
};