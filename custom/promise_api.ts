function promiseAll(promises) {
    let count = 0;
    const n = promises.length;
    const result = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < n; i++) {
            Promise.resolve(promises[i]).then(
                (res) => {
                    count++;
                    result[i] = res;
                    if (count === n) {
                        resolve(result);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        }
    });
}

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise).then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        }
    });
}

function promiseAllSettled(promises) {
    let count = 0;
    const n = promises.length;
    const result = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < n; i++) {
            Promise.resolve(promises[i]).then(
                (res) => {
                    count++;
                    result[i] = { status: "fulfilled", value: res };
                    if (count === n) {
                        resolve(result);
                    }
                },
                (err) => {
                    count++;
                    result[i] = { status: "rejected", reason: err };
                    if (count === n) {
                        reject(err);
                    }
                }
            );
        }
    });
}

function promiseAny(promises) {
    let count = 0;
    const n = promises.length;
    const reasons = Array.from({ length: n });
    return new Promise((resolve, reject) => {
        for (let i = 0; i < n; i++) {
            Promise.resolve(promises[i]).then(
                (res) => resolve(res),
                (err) => {
                    count++;
                    reasons[i] = err;
                    if (count === n) {
                        reject(err);
                    }
                }
            );
        }
    });
}
