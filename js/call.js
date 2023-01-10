function foo(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

let obj = {
    value: 2
};

// foo.call(obj, '名字', 18);
// foo.apply(obj, ['名字', 18]);

Function.prototype.mycall = function(ctx) {
    let context = ctx || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}

// foo.mycall(obj, '名字', 18);
foo.mycall(obj);

Function.prototype.myApply = function(ctx) {
    let context = ctx || window;
    context.fn = this;
    let res;
    if (arguments[1]) {
        res = context.fn(...arguments[1]);
    } else {
        res = context.fn();
    }
    delete context.fn;
    return res;
}

foo.myApply(obj, ['名字', 18]);

