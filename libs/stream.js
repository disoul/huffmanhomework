/*
 * stream.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const Transform = require('stream').Transform;
const huffman = require('./huffman');

class HuffmanStream extends Transform {
  constructor() {
    super();
    this.content = '';
    this.charmap = {};
    this.huffmanCode = {};
  }


  updateCharList(content) {
    for (let i = 0; i < content.length; i++) {
      if (this.charmap[content[i]]) {
        this.charmap[content[i]] ++;
      } else {
        this.charmap[content[i]] = 1;
      }
    }

    this.huffmanCode = huffman(this.charmap);
  }

  encode() {
    let binaryContent = '';
    let bufferArray = [];
    for (let i = 0; i < this.content.length; i++) {
      binaryContent += this.huffmanCode[this.content[i]];
    }
  
    for (let i = 0; i < binaryContent.length; i += 8) {
      let binarySlice = binaryContent.slice(i, i + 8);
      bufferArray.push(parseInt(binarySlice, 2));
    }

    console.log(bufferArray);
    return new Buffer(bufferArray, 'hex');
  }

}

let i = 0;
HuffmanStream.prototype._transform = function (chunk, encode, callback) {
  this.content += chunk.toString();
  this.updateCharList(chunk.toString());
  console.log('处理chunk', i, 'chunk length: ', chunk.toString().length);
  i++;
  callback();
}

HuffmanStream.prototype._flush = function (callback) {
  console.log('开始写入');
  this.push(JSON.stringify(this.huffmanCode));
  this.push('\n<<<<<\n'); // map分割标识符

  this.push(this.encode());
  this.push(null);
  callback();
}

module.exports = HuffmanStream;
