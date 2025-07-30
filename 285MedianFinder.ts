import { MaxPriorityQueue, MinPriorityQueue } from "./PriorityQueue";

class MedianFinder {
    leftHeap: MaxPriorityQueue;
    rightHeap: MinPriorityQueue;
    constructor() {
        this.leftHeap = new MaxPriorityQueue();
        this.rightHeap = new MinPriorityQueue();
    }

    addNum(num: number): void {
        const leftN = this.leftHeap.size();
        const rightN = this.rightHeap.size();
        if (leftN === 0) {
            this.leftHeap.push(num);
            return;
        }
        // 如果两个堆长度相等，那么需要先把 num 加入右堆，堆化后再把堆顶元素取出，加入到左堆
        if (leftN === rightN) {
            this.rightHeap.push(num);
            const val = this.rightHeap.shift();
            this.leftHeap.push(val);
            return;
        }
        // 如果两个堆长度不等（一定是左堆多），那么把 num 加入左堆，堆化后把堆顶元素取出加入到 右堆
        this.leftHeap.push(num);
        const val = this.leftHeap.shift();
        this.rightHeap.push(val);
    }

    findMedian(): number {
        const leftN = this.leftHeap.size();
        const rightN = this.rightHeap.size();
        if ((leftN + rightN) % 2 === 1) {
            return this.leftHeap.peek();
        }
        return (this.leftHeap.peek()+ this.rightHeap.peek()) / 2;
    }
}
const medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
/**
 * 用两个堆实现
 * 左边一半为大根堆，那么堆顶是第一个中位
 * 右边一半为小根堆，那么当 偶数个数 时，堆顶是第二个中位
 */
