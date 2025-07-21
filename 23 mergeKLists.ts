// 合并K个有序链表
function mergeKLists(lists) {
    return dfs(0, lists.length);
    // 合并 lists [i, j-1] 的链表
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
        const head2 = dfs(mid + 1, j);
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
        let tail = cur;
        while (tail.next) {
            tail = tail.next;
        }
        return [dummy.next, tail];
    }
}
