type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never

export function sum (a: number, b: number){
    return a+b;
}

let c: MyReturnType<typeof sum>