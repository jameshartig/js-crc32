(function(window, undefined) {
    var arrayType = Array,
        CRC32_TABLE;
    if (typeof Uint32Array === 'function') {
        arrayType = Uint32Array;
    }

    function stringToArray(string) {
        var bytes = new arrayType(string.length),
            i = 0,
            l = string.length;
        for (; i < l; ++i) {
            bytes[i] = string.charCodeAt(i);
        }
        return bytes;
    }

    function genCRC32Table() {
        var n = 0, c = 0;
        CRC32_TABLE = new arrayType(256);
        for (n = 0; n < 256; n++) {
            c = n;
            //unrolled loop for small perf gain (4x?)
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            c = (c & 1) ? ((c >>> 1) ^ 0xEDB88320) : (c >>> 1);
            CRC32_TABLE[n] = c;
        }
    }

    function crc32(arr) {
        var values = typeof arr === 'string' ? stringToArray(arr) : (arr.models || arr),
            crc = -1,
            i = 0,
            l = values.length,
            isObjects = (typeof values[0] === 'object'),
            id = 0;
        if (CRC32_TABLE === undefined) {
            genCRC32Table();
        }
        for (; i < l; i++) {
            if (isObjects) {
                id = values[i].id >>> 0;
            } else {
                id = values[i];
            }
            crc = CRC32_TABLE[(crc ^ id) & 0xFF] ^ (crc >>> 8);
        }
        //bitflip then cast to 32-bit unsigned
        return (~crc >>> 0).toString(16);
    }

    if (typeof module !== "undefined") {
        module.exports = crc32;
    } else {
        window.crc32 = crc32;

        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
            define('crc32', function() {
                return crc32;
            });
        }
    }
}(this));
