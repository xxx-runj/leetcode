/**
 * 入度 出度 概念
 * 直接就能上的课程是 入度 = 0 的课程，假设为 A
 * A 上完之后，依赖 A 的课程入度 就可以减少 1
 * 用 queue 记录入度为0的课程
 * 每次从队列中出一个元素，能上的课程数量+1
 * 且依赖此元素的课程入度 -1，若减少到0，则把此课程加入 queue 中
 * 若循环结束后，能上的课程数量 < 总课程数量，则无法完成所有课程的学习
 **/
// 广度
function canFinish(numCourses, prerequisites) {
    const inDgree = new Array(numCourses).fill(0);
    const dic = new Map(); // 统计一门课被哪些课程所依赖
    for (const [i, j] of prerequisites) {
        inDgree[i]++;
        const initial = dic.get(j) ?? [];
        initial.push(i);
        dic.set(j, initial);
    }
    // 初始化队列
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        inDgree[i] === 0 && queue.push(i);
    }
    let course = 0;
    while (queue.length > 0) {
        const cur = queue.shift();
        course++;
        const need = dic.get(cur) || [];
        for (const k of need) {
            inDgree[k]--;
            if (inDgree[k] === 0) {
                queue.push(k);
            }
        }
    }
    return course === numCourses;
}
// 深度
/**
 * 用一个矩阵 flags 来标记状态
 * flags[i] = 0，表示此课程还未遍历到
 *        = 1，表示此课程在当前路径中已被遍历过，说明有环，return false
 *        = -1，表示此课程已被其他路径遍历过
 */
function canFinish1(numCourses, prerequisites) {
    const flags = new Array(numCourses).fill(0);
    const group = Array.from({ length: numCourses }, () => []);
    for (const [i, j] of prerequisites) {
        group[j].push(i);
    }
    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) {
            return false;
        }
    }
    return true;

    // return false，表示有环
    function dfs(course) {
        if (flags[course] === -1) {
            return true;
        }
        if (flags[course] === 1) {
            return false;
        }
        flags[course] = 1;
        // 依次去遍历依赖此课程的课程
        for (const i of group[course]) {
            if (!dfs(i)) {
                return false;
            }
        }
        // course已安全遍历
        flags[course] = -1;
        return true;
    }
}
