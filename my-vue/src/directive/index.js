import Compile from './Compile';
import observe from '../reactive/observe';

export default class Vue {
    constructor(options) {
        this.options = options || {};
        this._data = options.data || undefined;
        // 数据响应式
        observe(this._data);
        this._initData();
        // 模版编译
        new Compile(options.el, this);
    }

    _initData() {
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    console.log(this._data[key]);
                    return this._data[key];
                },
                set(newVal) {
                    console.log(this._data[key]);
                    this._data[key] = newVal;
                }
            });
        });
    }
}

window.Vue = Vue;