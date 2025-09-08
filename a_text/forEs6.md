## 1. var let const
- var 函数作用域 变量提升 可重复声明
- let 块级作用域 无变量提升 不可重复声明
- const 块级作用域 无变量提升 不可重复声明 只读

## 2. 怎么理解 ES6 中的 Module 的
模块 就是一个有独立作用域的文件。
模块化的优点：代码抽象、封装、复用、依赖管理。  
ES6设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系

## 3. 作用域 词法作用域 作用域链
作用域：是 变量 和 函数 生效的 区域或集合  
JS是 词法作用域（静态作用域）：变量被创建时就确定好了  
作用域链：当JS中使用一个变量时，会先在当前作用域找，找不到时，再去上一层作用域寻找，直至找到该变量 或是 一直找到全局作用域

## 4. 闭包
闭包是一个能访问外部词法作用域变量的函数。使用场景：
- 创建私有变量
- 延长变量的生命周期

## 5. 原型 原型链
每个JS对象都有一个原型，指向其构造函数的原型对象  
当试图访问一个对象的属性时，会先在该对象上搜索，若找不到，则会去它的原型上进行查找。而它的原型也是一个对象，因此可以向上继续查找，以此类推。像这样的一条链路就称为原型链。

## 6. this 
this 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象

## 7. typeof 和 instanceof
- typeof：返回一个字符串，代表未经计算的操作数的类型
- instanceof：用于判断某个构造函数的prototype是否在此对象的原型链上

## 8. EventLoop
JS是单线程的，同一时间只能执行一个任务。事件循环是JS处理异步事件时进行的一种循环过程。JS引擎运行在渲染进程的主线程上
- 所有代码都是在主线程上执行的
- 遇到同步任务时，会立即执行
- 遇到异步任务，会将这个异步任务挂起，交给其他进程或线程进行处理
- 如果异步任务执行完毕，则将回调函数加入任务队列中。任务队列分为微任务队列和宏任务队列
- 当执行栈中的事件执行完毕后，会先检查微任务队列，如果有，则将队首任务压入执行栈执行。
- 微任务队列清空后，再去检查宏任务队列
### 宏任务
- script
- setTimeout
- setInterval
- I/O操作（文件的读取、网络请求）
- UI渲染、DOM事件回调
- requestAnimationFrame
### 微任务
- process.nextTick
- Promise.then/catch/finally
- MutationObserver(DOM变化监听回调)

## 9. 设计模式
设计模式是软件工程中总结出来的、可复用的解决特定问题的经验和方案。
- 单例模式（创建型模式）  
全局只有一个实例，共享
- 工厂模式（创建型模式）  
只需要一个工厂类，根据参数得到不同产品实例
- 观察者模式（行为型模式）  
观察者订阅被观察者，被观察者发生变化时通知观察者，一对多关系。耦合度高，适合对象之间有明确依赖，需要同步通知
- 发布-订阅模式（行为型模式）  
发布者和订阅者互不依赖，多对多关系，由事件中心协调。模块解耦，适合模块间松耦合通信，尤其异步事件流

## 10. Proxy
- target：固定，始终是原始被代理对象
- receiver：动态，表示这次属性访问的“调用者”，影响 getter/setter 里的 this

## 11. ts泛型
泛型是把类型参数化，可以代码复用、类型安全、类型推断。
应用场景：函数入参与返回值类型保持一致、泛型约束、泛型接口、泛型类

## 12. ts联合类型、交叉类型
联合类型：｜ A或B，某个变量可以有多个类型  
交叉类型：& A且B，一个类型同时拥有多个类型的特性，如果属性冲突，会取交集
```ts
interface ClassA {
    name: string
    age: number
    height: number
}
interface ClassB {
    name: string
    sex: string
    height: string
}
// 交叉类型 &
type User1 = ClassA & ClassB
const user1: User1 = {
    // ClassA  ClassB 的 name 属性类型一致
    name: 'xxx',
    age: 20,
    sex: 'female',
    // ClassA  ClassB 的 height 属性类型不一致，合并后变成 height: never
    height: 180, // 报错，不能将类型“number”分配给类型“never”
}

// 联合类型 ｜
type User2 = ClassA | ClassB
// OK user2的类型为 ClassA 或 ClassB 都可，但属性不可混用
const user2: User2 = {
    name: 'xxx',
    age: 20,
    height: 180
};
```

## 13. 实现ts的Pick、Omit
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
// Omit更宽容，允许传入不属于 T 属性的键
type Omit<T,K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

## 14. async await 的底层实现
利用 generator 和 promise
