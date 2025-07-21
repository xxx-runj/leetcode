function _Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}
function copyRandomList(head) {
    if (!head) {
        return head;
    }
    let cur = head;
    while (cur) {
        // 复制节点
        const node = new _Node(cur.val, cur.next, null);
        cur.next = node;
        cur = node.next;
    }
    // 修改新节点的random
    cur = head;
    while (cur) {
        const node = cur.next;
        if (cur.random) {
            node.random = cur.random.next;
        }
        cur = node.next;
    }
    // 拆分两个链表
    let prev = head;
    let res = prev.next;
    cur = prev.next;
    while (cur.next) {
        prev.next = cur.next;
        cur.next = cur.next.next;
        prev = prev.next;
        cur = cur.next;
    }
    // 单独处理原链表的尾部节点
    prev.next = null;
    return res;
}

function copyRandomList1(head) {
    if (!head) {
        return head;
    }
    const dic = new Map();
    let cur = head;
    // 构建哈希表映射 原节点 ——> 新节点
    while (cur) {
        // 复制节点
        const node = new _Node(cur.val, null, null);
        dic.set(cur, node)
        cur = cur.next;
    }
    cur = head;
    // 遍历哈希表
    while(cur) {
        const node = dic.get(cur);
        node.next = dic.get(cur.next) ?? null;;
        node.random = dic.get(cur.random) ?? null;
        cur = cur.next;
    }
    return dic.get(head);
}

const node0 = new _Node(7, null, null)
const node1 = new _Node(13, null, null)
const node2 = new _Node(11, null, null)
const node3 = new _Node(10, null, null)
const node4 = new _Node(1, null, null)
node0.next = node1;
node1.next = node2; node1.random = node0;
node2.next = node3; node2.random = node4;
node3.next = node4; node3.random = node2;
node4.random = node0;
console.log(copyRandomList1(node0));