/**
 *https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
 *@example
 * var request = new Deferred();
 * request.then(()=>{
 *  console.log(1);
 * })
 * request.resolve();
 *
 * 
 */
export class Deferred {
    constructor() {
        let p = this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.then = this.promise.then.bind(p);
        this.catch = this.promise.catch.bind(p);
    }
}