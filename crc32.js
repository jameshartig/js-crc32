(function(window, undefined) {
    var arrayType = Array,
        functionStr = 'function',
        objectStr = 'object',
        CRC32_TABLE;
    if (typeof Uint32Array === functionStr) {
        arrayType = Uint32Array;
    }

    function stringToArray(string) {
        var l = string.length,
            bytes = new arrayType(l),
            i = 0;
        for (; i < l; i++) {
            bytes[i] = string.charCodeAt(i);
        }
        return bytes;
    }

    function genCRC32Table() {
        var i = 0, c = 0, b = 0;
        CRC32_TABLE = new arrayType(256);
        for (i = 0; i < 256; i++) {
            c = i;
            b = 8;
            while (b--) {
                c = (c >>> 1) ^ ((c & 1) ? 0xEDB88320 : 0);
            }
            CRC32_TABLE[i] = c;
        }
    }

    function crc32(arr) {
        var values = typeof arr === 'string' ? stringToArray(arr) : (arr.models || arr),
            crc = -1,
            i = 0,
            l = values.length,
            isObjects = (typeof values[0] === objectStr),
            id = 0;
        if (CRC32_TABLE === undefined) {
            genCRC32Table();
        }
        for (; i < l; i++) {
            id = isObjects ? (values[i].id >>> 0) : values[i];
            crc = CRC32_TABLE[(crc ^ id) & 0xFF] ^ (crc >>> 8);
        }
        //bitflip then cast to 32-bit unsigned
        return (~crc >>> 0).toString(16);
    }

    if (typeof module !== 'undefined') {
        module.exports = crc32;
    } else {
        window.crc32 = crc32;

        if (typeof define === functionStr && typeof define.amd === objectStr && define.amd) {
            define('crc32', function() {
                return crc32;
            });
        }
    }
}(this));
