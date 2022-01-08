const exec = require('child_process').exec;

var process = exec('dir');

process.stdout.on('data', function(data){
    console.log(data.toString('utf8'))
});

process.stderr.on('data', function(data) {
    console.errer(data.toString('utf8'));
});