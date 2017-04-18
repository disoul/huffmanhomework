/*
 * stream.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const Transform = require('stream').Transform;

class HuffmanStream extends Transform {
  constructor() {
    super();
    this.content = '';
  }

}

HuffmanStream.prototype._transform = function (chunk, encode, callback) {
  console.log(chunk.toString());
  console.log('<<<<<<<<');
  this.content += chunk;

  this.push(chunk);
  if (!chunk) {
    this.push(null);
  }
  callback();
}

module.exports = HuffmanStream;
