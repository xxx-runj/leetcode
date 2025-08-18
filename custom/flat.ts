// 指定将数组拍平几层
function flat(arr: any[], depth) {
    if (depth === 0) {
        return arr;
    }
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(...flat(item, depth - 1));
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}
const res = flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1);