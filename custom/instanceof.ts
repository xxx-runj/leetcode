// 实现 instanceof
function c_instanceof(obj, constructor) {
    if (obj === null || typeof obj !== "object") {
        return false;
    }
    let proto = Object.getPrototypeOf(obj);
    while (proto) {
        if(proto === constructor.prototype){
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false;
}
