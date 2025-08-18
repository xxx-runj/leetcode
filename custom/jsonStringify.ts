// 现给定一个值，返回该值的有效 JSON 字符串。
// 你可以假设这个值只包括字符串、整数、数组、对象、布尔值和 null。
// 返回的字符串不能包含额外的空格
// 键的返回顺序应该与 Object.keys() 的顺序相同
function jsonStringify(obj: any) {
    if (obj === null) {
        return "null";
    }
    if (typeof obj === "string") {
        return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    if (typeof obj === "number" || typeof obj === "boolean") {
        return String(obj);
    }
    if (Array.isArray(obj)) {
        return `${obj.map((item) => jsonStringify(item)).join(",")}`;
    }
    const props = [];
    for (const key of Object.keys(obj)) {
        props.push(`"${key}":${jsonStringify(obj[key])}`);
    }
    return `{${props.join(",")}}`;
}
