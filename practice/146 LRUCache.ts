// 在末尾加入一项
// 去除最前端一项
// 将队列中某一项移到末尾
function ListNode(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.dummy = new ListNode(null, null);
    this.dummy.prev = this.dummy;
    this.dummy.next = this.dummy;
    this.dic = new Map();

    // 移除指定节点
    this.remove = function (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    };
    // 链表头插入一项
    this.unshift = function (node) {
        node.prev = this.dummy;
        node.next = this.dummy.next;
        node.next.prev = node;
        node.prev.next = node;
    };
    // 获取 key 对应的节点，并把它插到链表头部
    this.getNode = function (key) {
        if (!this.dic.has(key)) {
            // 没有
            return null;
        }
        const node = this.dic.get(key);
        this.remove(node);
        this.unshift(node);
        return node;
    };
};

LRUCache.prototype.get = function (key) {
    const node = this.getNode(key);
    return node ? node.value : -1;
};

LRUCache.prototype.put = function (key, value) {
    const node = this.getNode(key);
    if (node) {
        node.value = value;
        return;
    }
    const newNode = new ListNode(key, value);
    this.dic.set(key, newNode);
    this.unshift(newNode);
    if (this.dic.size > this.capacity) {
        // 删除尾部节点
        const tail = this.dummy.prev;
        this.dic.delete(tail.value);
        this.remove(tail);
    }
};

const ins = new LRUCache(2);
ins.put(1, 1);
ins.put(2, 2);
ins.get(1);
ins.put(3, 3);
