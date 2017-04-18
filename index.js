/*
 * index.js
 * Copyright (C) 2017 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const fs = require('fs');
const path = require('path');
const huffman = require('./libs/huffman');
const HuffmanStream = require('./libs/stream');

const huffmanStream = new HuffmanStream();

let inputStream = fs.createReadStream(path.resolve(__dirname, './input.txt'), 'utf8');
let outputStream = fs.createWriteStream(path.resolve(__dirname, './out.txt'));
inputStream
.pipe(huffmanStream)
.pipe(outputStream);
