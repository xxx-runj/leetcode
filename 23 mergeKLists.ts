import { ListNode } from "./ListNode";

// 合并K个有序链表
function mergeKLists(lists) {
    return dfs(0, lists.length);
    // 合并 lists [i, j) 的链表
    function dfs(i, j) {
        const m = j - i;
        if (m === 0) {
            return null;
        }
        if (m === 1) {
            return lists[i];
        }
        const mid = i + (m >> 1);
        const head1 = dfs(i, mid);
        const head2 = dfs(mid, j);
        return mergeTwoLists(head1, head2);
    }

    // 合并两个有序链表
    function mergeTwoLists(head1, head2) {
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
const node1_5 = new ListNode(5, null);
const node1_4 = new ListNode(4, node1_5);
const head1 = new ListNode(1, node1_4);

const node2_4 = new ListNode(4, null);
const node2_3 = new ListNode(3, node2_4);
const head2 = new ListNode(1, node2_3);

const node3_6 = new ListNode(6, null);
const head3 = new ListNode(2, node3_6);
console.log(mergeKLists([head1, head2, head3]))
