/**
 * built by slashhuang 
 * 采用nodemon自动编译注释文档
 */
var exec = require('child_process').exec;
exec('npm run docBuild',(err,stdOut,stdErr)=>{
   console.log('starting building doc')
});