var assert = require('assert');
var cluster = require('cluster');
var vh = require('bindings')('verushash.node');

var reverseBuffer = function (buff) {
    var reversed = Buffer.alloc(buff.length);
    for (var i = buff.length - 1; i >= 0; i--)
        reversed[buff.length - i - 1] = buff[i];
    return reversed;
};
var reverseHex = function (hex) {
    return reverseBuffer(Buffer.from(hex, 'hex')).toString('hex');
};

var numWorkers = require('os').cpus().length;
numWorkers = 1; /* increase for multi-thread testing of data collision */

if (cluster.isMaster) {
    
    var workers = [];
    var gbtCount = 0;
    for (var i = 0; i < numWorkers; i++){
        var worker = cluster.fork({
            workerType: 'VerusHasher',
            forkId: i
        });
        workers.push(worker);
    }
    
    cluster.on('exit', function (worker, code) {
        process.exit(code || 0);
    });
} else {
    var sample = Buffer.from('Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234','utf8');

    function expect(name, output, reversedHex) {
        var got = reverseHex(output.toString('hex'));
        console.log(process.pid, name, got, '\n');
        assert.strictEqual(got, reversedHex, name);
    }

    expect('VerusHash1   Output', vh.hash(sample), '2cd709e6569bd706f14a09e62042ddccfa63bd3725b21f35a8c98adbf4151184');
    expect('VerusHash2   Output', vh.hash2(sample), '55cec43b110570481f6d565c3a8bb6ed174956494aeebf4c264283791dbd3ded');
    expect('VerusHash2b  Output', vh.hash2b(sample), 'f971af1d4e551e9e71d35c6266fc19a98c6ad0388be1e9979f66921e07b5c9ac');
    expect('VerusHash2b1 Output', vh.hash2b1(sample), '0ef8b9530ce44a7ffb9b520daf8fcf59d1d22dd1bfa1a26ef4351d51e37071b7');

    // 140-byte header, 3-byte solution marker, then the solution. Version is the first four solution bytes.
    function headerWithVersion(version) {
        var buf = Buffer.alloc(320);
        for (var i = 0; i < buf.length; i++) buf[i] = (i * 17 + 3) & 0xff;
        buf.writeUInt32LE(version, 143);
        buf[148] = 0;
        return buf;
    }

    var version4 = headerWithVersion(4);
    var version8 = headerWithVersion(8);
    var version9 = headerWithVersion(9);
    var hash2b2v4 = vh.hash2b2(version4);
    var hash2b3v4 = vh.hash2b3(version4);
    var hash2b2v8 = vh.hash2b2(version8);
    var hash2b3v8 = vh.hash2b3(version8);
    var hash2b2v9 = vh.hash2b2(version9);
    var hash2b3v9 = vh.hash2b3(version9);

    assert.ok(!hash2b2v4.equals(hash2b3v4), 'solution version 4 stays on VerusHash 2.2');
    assert.ok(!hash2b2v8.equals(hash2b3v8), 'solution version 8 stays on VerusHash 2.2');
    assert.ok(hash2b2v9.equals(hash2b3v9), 'solution version 9 uses VerusHash 2.3');
    console.log(process.pid, 'VerusHash2b2 version 4', reverseHex(hash2b2v4.toString('hex')));
    console.log(process.pid, 'VerusHash2.3 version 9', reverseHex(hash2b2v9.toString('hex')), '\n');

    var rejected = headerWithVersion(9);
    rejected[148] = 1;
    var rejectedHash = vh.hash2b2(rejected);
    assert.ok(rejectedHash.equals(Buffer.alloc(32, 0xff)), 'unmatched merged-mining header is rejected');

    var cleared = headerWithVersion(9);
    cleared[148] = 1;
    cleared.fill(0, 4, 100);
    cleared.fill(0, 104, 140);
    cleared.fill(0, 151, 215);
    var cleared2b2 = vh.hash2b2(Buffer.from(cleared));
    var cleared2b3 = vh.hash2b3(cleared);
    assert.ok(cleared2b2.equals(cleared2b3), 'pre-cleared version 9 header uses VerusHash 2.3');
    assert.ok(!cleared2b2.equals(Buffer.alloc(32, 0xff)), 'pre-cleared version 9 header is hashed');
    process.exit(0);
}
