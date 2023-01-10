const myWebpack = require('../lib/my-webpack');
const config = require('../config/webpack.config');

const compiler = myWebpack(config);

// 开始打包wb
compiler.run();