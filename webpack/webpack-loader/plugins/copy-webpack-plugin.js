const { validate } = require('schema-utils');
const globby = require('globby');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const webpack = require('webpack');

const schema = require('./schema.json');
const promiseReadFile = promisify(fs.readFile);
const { RawSource } = webpack.sources;

class CopyWebpackPlugin {
    constructor (options = {}) {
        // 验证 options 是否合法
        validate(schema, options, {
            name: 'CopyWebpackPlugin'
        });
        this.options = options;
    }
    apply (compiler) {
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
            // 1、添加资源触发的钩子
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (cb) => {
                // 将 from 中的资源，输出
                const { from, ignore} = this.options;
                // 运行指令的目录
                const ctx = compiler.options.context;
                const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(ctx, from);
                const to = this.options.to || '.';
                const paths = await globby(absoluteFrom, { ignore });
                // 2、读取所有资源
                const files = await Promise.all(
                    paths.map(async (p) => {
                        const data = await promiseReadFile(p);
                        const relativePath = path.basename(p);
                        const fileName = path.join(to, relativePath);
                        return { 
                            data,
                            fileName
                         };
                    })
                );
                // 3、生成webpack格式的资源
                const assets = files.map((file) => {
                    const {data, fileName} = file;
                    const source = new RawSource(data);
                    return {
                        source,
                        fileName
                    }
                });
                // 4、添加到 compilation 中输出
                assets.forEach((asset) => {
                    const { source, fileName } = asset;
                    compilation.emitAsset(fileName, source);
                });
                cb();
            });
        })
    }
}

module.exports = CopyWebpackPlugin;