var assert = require('assert'),
    crc32 = require('../crc32.js'),
    arr;


arr = [0, 1, 2, 3];
assert.equal(crc32(arr), '8bb98613');

arr = [Math.pow(2, 32)];
assert.equal(crc32(arr), 'd202ef8d');

//compared against https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/mann/crc32.n.html
assert.equal(crc32('Hello, World!'), 'ec4ac3d0');

//https://github.com/Sembiance/mhash/issues/1
assert.equal(crc32('alejandro'), 'aac5a14f');
