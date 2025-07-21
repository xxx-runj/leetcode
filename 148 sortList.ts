function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
// 归并排序 自上向下
function sortList(head) {
    if (!head || !head.next) {
        return head;
    }
    // 划分链表
    const head2 = middleNode(head);
    // 分别对head 和 head2 排序，然后再合并（合并两个有序链表）
    return merge(sortList(head), sortList(head2));

    // 辅助函数 从链表中间分成两段
    function middleNode(head) {
        let slow = head;
        let fast = head;
        let pre = head;
        while (fast && fast.next) {
            pre = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        // 断开slow与前一个节点的联系
        pre.next = null;
        return slow;
    }
    function merge(head1, head2) {
        const dummy = new ListNode(-1, null);
        let cur = dummy;
        while (head1 !== null && head2 !== null) {
            if (head1.val <= head2.val) {
                cur.next = head1;
                head1 = head1.next;
            } else {
                cur.next = head2;
                head2 = head2.next;
            }
            cur = cur.next;
        }
        if (head1) {
            cur.next = head1;
        }
        if (head2) {
            cur.next = head2;
        }
        return dummy.next;
    }
}

// 归并排序，自下向上
function sortList1(head) {
    const len = getLinkLength(head);
    const dummy = new ListNode(-1, head);
    for (let step = 1; step < len; step *= 2) {
        let newListTail = dummy;
        let cur = dummy.next;
        // 每次合并 step 长度的节点
        while (cur) {
            const head1 = cur;
            const head2 = splitLink(head1, step);
            // cur 为下一轮循环的起点
            cur = splitLink(head2, step);
            const [newH, newT] = merge(head1, head2);
            newListTail.next = newH;
            newListTail = newT;
        }
    }
    return dummy.next;

    function getLinkLength(head) {
        let n = 0;
        while (head) {
            n++;
            head = head.next;
        }
        return n;
    }
    function splitLink(head, step) {
        // 找到新的头节点的前一个节点
        while (--step > 0 && head) {
            head = head.next;
        }
        if (!head) {
            return null;
        }
        const head2 = head.next;
        head.next = null;
        return head2;
    }
    function merge(head1, head2){
        const dummy = new ListNode(-1, null);
        let cur = dummy;
        while (head1 !== null && head2 !== null) {
            if (head1.val <= head2.val) {
                cur.next = head1;
                head1 = head1.next;
            } else {
                cur.next = head2;
                head2 = head2.next;
            }
            cur = cur.next;
        }
        if (head1) {
            cur.next = head1;
        }
        if (head2) {
            cur.next = head2;
        }
        let tail = cur;
        while(tail.next) {
            tail = tail.next;
        }
        return [dummy.next, tail]
    }
}

const test3 = new ListNode(3, null);
const test2 = new ListNode(1, test3);
const test1 = new ListNode(2, test2);
const test0 = new ListNode(4, test1);
console.log(sortList1(test0))