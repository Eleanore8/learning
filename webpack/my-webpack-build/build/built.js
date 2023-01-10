
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
    require('./src/index.js')
})({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(5, 2));","deps":{"./add.js":"/Users/zhengting/Desktop/learning/my-webpack-build/src/add.js","./count.js":"/Users/zhengting/Desktop/learning/my-webpack-build/src/count.js"}},"/Users/zhengting/Desktop/learning/my-webpack-build/src/add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n// const add = (a, b) => (a + b);\nfunction add(a, b) {\n  return a + b;\n}\n\nvar _default = add;\nexports[\"default\"] = _default;","deps":{}},"/Users/zhengting/Desktop/learning/my-webpack-build/src/count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\n// const count = (a, b) => (a - b);\nfunction count(a, b) {\n  return a - b;\n}\n\nvar _default = count;\nexports[\"default\"] = _default;","deps":{}}})
        