let userIDs = [1,2,3];

// userIDs.reduce( async (previousPromise, nextID) => {
//     await previousPromise;
//     return methodThatReturnsAPromise(nextID);
// }, Promise.resolve());

userIDs.reduce( (previousPromise, nextID) => {
    return previousPromise.then(() => {
        return methodThatReturnsAPromise(nextID);
    });
}, Promise.resolve());
function methodThatReturnsAPromise(nextID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            console.log(`Resolve! ${nextID} ${new Date().toString()}`);

            resolve();
        }, 1000);
    });
}
