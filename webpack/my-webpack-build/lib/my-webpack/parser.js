const fs = require('fs');
const babelParser = require('@babel/parser');
const { transformFromAst } = require('@babel/core');
const traverse = require('@babel/traverse').default;
const { dirname, resolve } = require('path');

const parser = {
    // 解析成ast抽象语法树
    getAst(filePath) {
        const file = fs.readFileSync(filePath, 'utf-8');
        const ast = babelParser.parse(file, {
            sourceType: 'module'
        });
        return ast;
    },
    // 收集依赖
    getDeps(ast, filePath) {
        // 获取文件夹路径
        const dirName = dirname(filePath);
        // 存储依赖
        const deps = {};
        traverse(ast, {
            ImportDeclaration({ node }) {
                const relativePath = node.source.value;
                const absolutePath = resolve(dirName, relativePath);
                deps[relativePath] = absolutePath;
            }
        });
        return deps;
    },
    // 解析
    getCode(ast) {
        const { code } = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });
        return code;
    }
};

module.exports = parser;
