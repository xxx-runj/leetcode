function groupAnagrams(strs){
    const record = new Map();
    for(const s of strs) {
        const c = s.split('').sort().join('');
        const g = record.get(c) ?? [];
        g.push(s)
        record.set(c, g)
    }
    return Array.from(record.values())
}