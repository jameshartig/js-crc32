# crc32 #

crc32 implemented in JavaScript for node.js or browsers. Tries to use typed arrays if available. Returns the
hexidecimal representation of the crc32.

This implements the most common variation of crc32 using a reversed polynomial of 0xEDB88320. If you're comparing
to PHP you'll need to either use `hash("crc32b", $str)` or `dechex(crc32($str))`.  If you're comparing to python
use `hex(zlib.crc32(str) & 0xffffffffL)`. It seems that `mhash` (and things based off mhash) uses a different
variation so keep that in mind when using the generated values across platforms[[1]].

[1]: https://github.com/Sembiance/mhash/issues/1
