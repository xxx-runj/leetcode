function curry(fn){
    return function curried(...args){
        if(args.length >= fn.length){
            return fn(...args)
        }
        return (...nextArgs) => {
            return curried(...args, ...nextArgs)
        }
    }
}

function sum(a, b, c){
    return a+b+c;
}
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3))