var util=require('util')
var exec=require('child_process').exec;
exec('browserify demo.js -o ./demo/bundle.js',function(err,stdout,stderr){
    util.puts("building demo")
    util.puts(stdout)
    if(!err)
    	console.log("build complete")
    else
    	util.puts(err)
})
