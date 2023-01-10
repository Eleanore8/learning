const { getAst, getDeps, getCode} = require('./parser');
const { writeFileSync } = require('fs');
const { resolve } = require('path');

class Compiler {
    constructor(options = {}) {
        this.options = options;
        this.modules = [];// 依赖容器
    }
    // 启动webpack打包
    run () {
        const filePath = this.options.entry;
        const fileInfo = this.build(filePath);

        this.modules.push(fileInfo);
        this.modules.forEach((info) => {
            const { deps } = info;
            for (const relativePath in deps) {
                const absolutePath = deps[relativePath];
                const childInfo = this.build(absolutePath);
                this.modules.push(childInfo);
            }
        });
        const graph = this.modules.reduce((pre, cur) => {
            return {
                ...pre,
                [cur.filePath]: {
                    code: cur.code,
                    deps: cur.deps
                }
            }
        }, {});
        // console.log(this.modules);
        // console.log(graph);
        this.generate(graph);
    }
    build(filePath) {
        const ast = getAst(filePath);
        const deps = getDeps(ast, filePath);
        const code = getCode(ast);
        return {
            filePath,
            deps,
            code
        };
    }
    // 生成输出资源
    generate(graph) {
        const bundle = `
(function (graph) {
    function require(module) {
        function localRequire(relativePath) {
            return require(graph[module].deps[relativePath])
        }
        var exports = {};

        (function (require, exports, code) {
            eval(code)
        })(localRequire, exports, graph[module].code)

        return exports;
    }
    require('${this.options.entry}')
})(${JSON.stringify(graph)})
        `;
        const { path, fileName } = this.options.output;
        const outFilePath = resolve(path, fileName);
        console.log(outFilePath)
        writeFileSync(outFilePath, bundle, 'utf-8');
    }
}

module.exports = Compiler;
