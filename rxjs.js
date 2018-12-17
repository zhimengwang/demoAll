const Rx = require('rxjs')

var source = Rx.Observable.interval(1000)
    .take(3)
    .multicast(new Rx.Subject());

var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

source.subscribe(observerA); // subject.subscribe(observerA)

source.connect(); // source.subscribe(subject)

source.unsubscribe()
setTimeout(() => {
    source.subscribe(observerB); // subject.subscribe(observerB)
}, 1000);