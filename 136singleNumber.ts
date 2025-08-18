function singleNumber(nums){
    let tmp = 0;
    for(const x of nums){
        tmp = x ^ tmp;
    }
    return tmp;
}