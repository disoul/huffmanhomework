/**
 * return huffman code map
 *
 * @param {[Char]} charmap
 * @returns {{ Char: Code, ... }}
 */
let huffmanCode = {};

class HuffmanTreeNode {
  constructor(char, count) {
    this.count = count;
    this.char = char;
    // TODO:
    this.id = Math.random();
    this.left = null;
    this.right = null;
  }
}

function getHuffmanTree(charlist) {
  while (charlist.length > 1) {
    charlist = charlist.sort((a, b) => {
      if (a.count > b.count) return 1;
      if (a.count < b.count) return -1;
      return 0;
    });
    let root = new HuffmanTreeNode(null, charlist[0].count + charlist[1].count);
    root.left = charlist[0];
    root.right = charlist[1];
    charlist = charlist.slice(2, charlist.length);
    charlist.push(root);
  }
  
  return charlist;
}

function getHuffmanCode(root, current) {
  if (root.left && root.left.char) {
    huffmanCode[root.left.char] = current + '0';
  }
  if (root.right && root.right.char) {
    huffmanCode[root.right.char] = current + '1';
  }

  root.left && getHuffmanCode(root.left, current + '0');
  root.right && getHuffmanCode(root.right, current + '1');
}

function huffman(charmap) {
  let charlist = [];
  for (let key in charmap) {
    charlist.push(new HuffmanTreeNode(key, charmap[key]));
  }
  charlist = getHuffmanTree(charlist);

  let root = charlist[0];
  let currentCode = '';
  getHuffmanCode(root, currentCode);

  console.log(huffmanCode);
}

module.exports = huffman;
