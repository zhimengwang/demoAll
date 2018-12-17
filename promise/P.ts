enum PStatus {
    PENDING,
    FULFILLED,
    REJECTED
}

export class P {

    status: PStatus = PStatus.PENDING;
    onRejectedCallback: Function[];
    onFulfilledCallbacks: Function[];
    value: any;

    constructor(excutor: Function) {
        try {
            excutor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    static resolvePromise(promise2: P, x: any, resolve: Function, reject: Function) {
        let called = false; // 避免多次调用

        if (promise2 === x) {
            throw  new TypeError('Chaining cycle detected for promise!')
        }

        if (x instanceof P) {
            if (x.status === PStatus.PENDING) {
                x.then(P.resolvePromise(promise2, x, resolve, reject), reject)
            } else {
                x.then(resolve, reject)
            }
        } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            const then = x.then;
            try {
                if (typeof  then === 'function') {
                    then.call(x, function (value) {
                        if (called) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
                        called = true;
                        return x.then(P.resolvePromise(promise2, value, resolve, reject), reject)
                    }, function (reason) {
                        if (called) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
                        called = true;
                        return reject(reason)
                    })
                } else {
                    reject(x)
                }
            } catch (e) {
                reject(e)
            }
        } else {
            if (called) return; // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            called = true;
            resolve(x)
        }
    }

    then(onResolved, onRejected) {

        onResolved = Object.prototype.toString.call(onResolved) === '[object Function]' ? onResolved : value => value;
        onRejected = Object.prototype.toString.call(onRejected) === '[object Function]' ? onRejected : value => value;


        if (this.status === PStatus.FULFILLED) {
            return promise2 = new P((resolve, reject) => {
                try {
                    const x = onResolved(this.value);
                    if (x instanceof P) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                        P.resolvePromise(promise2, x, resolve, reject)
                    }
                    resolve(x) // 否则，以它的返回值做为promise2的结果
                } catch (e) {
                    reject(e) // 如果出错，以捕获到的错误做为promise2的结果
                }
            })
        }

        if (this.status === PStatus.REJECTED) {
            return promise2 = new P((resolve, reject) => {
                try {
                    const x = onRejected(this.value);
                    if (x instanceof P) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                        P.resolvePromise(promise2, x, resolve, reject)
                    }
                } catch (e) {
                    reject(e) // 如果出错，以捕获到的错误做为promise2的结果
                }
            })
        }

        if (this.status === PStatus.PENDING) {
            return promise2 = new P((resolve, reject) => {
                this.onFulfilledCallbacks.push((value) => {
                    try {
                        var x = onResolved(this.value)
                        if (x instanceof Promise) {
                            P.resolvePromise(promise2, x, resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })

                this.onRejectedCallback.push((reason) => {
                    try {
                        var x = onRejected(this.value)
                        if (x instanceof Promise) {
                            P.resolvePromise(promise2, x, resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

    }

    catch() {

    }

    resolve(value: any) {
        if (value instanceof Promise) {
            return value.then(this.resolve, this.reject)
        }
        setTimeout(() => {
            if (this.status = PStatus.PENDING) {
                this.status = PStatus.FULFILLED;
                this.value = value;
                this.onRejectedCallback.forEach(cb => cb(value))
            }
        })
    }

    reject(reason: any): void {
        setTimeout(() => {
            if (this.status = PStatus.PENDING) {
                this.status = PStatus.REJECTED;
                this.onFulfilledCallbacks.forEach(cb => cb(reason))
            }
        })
    }
}