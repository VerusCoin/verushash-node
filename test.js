// var cluster = require('cluster');
var vh = require('bindings')('verushash.node');


var reverseHex = function (hex) {
    return Buffer.from(hex, 'hex').reverse().toString('hex');
};

// var numWorkers = require('os').cpus().length;
// numWorkers = 1; /* increase for multi-thread testing of data collision */

// if (cluster.isMaster) {
    
//     var workers = [];
//     var gbtCount = 0;
//     for (var i = 0; i < numWorkers; i++){
//         var worker = cluster.fork({
//             workerType: 'VerusHasher',
//             forkId: i
//         });
//         workers.push(worker);
//     }
    
// } else {
    
    var output = vh.hash(Buffer.from('Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234','utf8'));
    console.log(process.pid,'VerusHash1   Output', reverseHex(output.toString('hex')), '\n');

    output = vh.hash2(Buffer.from('Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234','utf8'));
    console.log(process.pid,'VerusHash2   Output', reverseHex(output.toString('hex')), '\n');
    
    output = vh.hash2b(Buffer.from('Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234','utf8'));
    console.log(process.pid,'VerusHash2b  Output', reverseHex(output.toString('hex')), '\n');
    
    output = vh.hash2b1(Buffer.from('Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234Test1234','utf8'));
    console.log(process.pid,'VerusHash2b1 Output', reverseHex(output.toString('hex')), '\n');
// }
