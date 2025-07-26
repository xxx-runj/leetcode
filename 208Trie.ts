var TrieNode = function() {
     this.son = {};
     this.isEnd = false;
}

var Trie = function() {
    this.root = new TrieNode();
};

Trie.prototype.searchPrefix = function(prefix) {
    let cur = this.root;
    for(const c of prefix) {
        if(!cur.son[c]) {
            return null;
        }
        cur = cur.son[c];
    }
    return cur;
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let cur = this.root;
    for(const c of word) {
        if(!cur.son[c]){
            cur.son[c] = new TrieNode();
        }
        cur = cur.son[c]
    }
    cur.isEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word);
    return node ? node.isEnd : false;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    const node = this.searchPrefix(prefix);
    return !!node
};