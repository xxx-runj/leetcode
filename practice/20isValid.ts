function isValid(s: string) {
    const dic = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    const stack = [];
    for(const c of s){
        if(c in dic) {
            stack.push(c);
        } else if(dic[stack.pop()] !== c) {
            return false;
        }
    }
    return stack.length === 0;
}
