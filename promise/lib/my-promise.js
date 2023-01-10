// 自定义promise模块

(function (window) {
    const PROMISE_STATES = {
        PENDING: 'pending',
        FULFILLED: 'fulfilled',
        REJECTED: 'rejected'
    };

    /**
     * 
     * @param {*} excutor 执行器函数（同步）
     */
    function MyPromise (excutor) {
        const self = this;
        self.status = PROMISE_STATES.PENDING;
        self.data = undefined;
        self.callbacks = [];

        function resolve (value) {
            // 如果状态不为 pending，直接return
            if (self.status !== PROMISE_STATES.PENDING) return;

            self.status = 'fulfilled';
            self.data = value;
            // 如果有待执行的回调callback函数，立即异步执行
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach((cbObj) => {
                        cbObj.onResolved(value);
                    });
                });
            }
        }
        function reject (reason) {
            // 如果状态不为 pending，直接return
            if (self.status !== PROMISE_STATES.PENDING) return;

            self.status = 'rejected';
            self.data = reason;
            // 如果有待执行的回调callback函数，立即异步执行
            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach((cbObj) => {
                        cbObj.onRejected(reason);
                    });
                });
            }
        }

        try {
            excutor(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    MyPromise.prototype.then = function (onResolved, onRejected) {
        onResolved = typeof onResolved === 'function' ? onResolved : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {throw reason};
        const self = this;
        
        return new MyPromise((resolve, reject) => {

            function handle (cb) {
                try {
                    const result = cb(self.data);
                    // 如果返回值为promise，则返回promise的结果值
                    if (result instanceof MyPromise) {
                        // res.then(
                        //     (value) => resolve(value),
                        //     (reason) => reject(reason)
                        // );
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }

            if (self.status === PROMISE_STATES.PENDING) {
                self.callbacks.push({
                    onResolved() {
                        handle(onResolved);
                    },
                    onRejected() {
                        handle(onRejected);
                    }
                });
            } else if (self.status === PROMISE_STATES.FULFILLED) {
                setTimeout(() => {
                    handle(onResolved);
                });
            } else {
                setTimeout(() => {
                    handle(onRejected);
                });
            }
        });
    }
    MyPromise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    }

    MyPromise.resolve = function (value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    }
    MyPromise.reject = function (reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }
    /**
     * 
     * @param {*} promises 
     * @returns promise，只有都成功时才返回成功
     */
    MyPromise.all = function (promises) {
        const arr = new Array(promises.length);
        let resolvedCount = 0;
        return new MyPromise((resolve, reject) => {
            promises.forEach((p, i) => {
                MyPromise.resolve(p).then(
                    val => {
                        resolvedCount++;
                        arr[i] = val;

                        if (resolvedCount === promises.length) {
                            resolve(arr);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }
    MyPromise.race = function (promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((p) => {
                p.then(
                    val => {
                        resolve(val);
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }

    window.MyPromise = MyPromise;
})(window)