#! /usr/bin/env node 

const chalk = require("chalk")
const {spawn} = require('child_process')
const {log} = require('console')
const fs = require("fs") 

const file = process.argv[2] 
const ext = file.split(".").pop()

if(ext == "cpp" || ext=="c" ){
    const compile = spawn('g++' , [file], {stdio: ['pipe',process.stdout,process.stderr]})
    compile.on('close',code => {
        if(code === 0){
            const run =  spawn('./a.out', {stdio: [process.stdin, 'pipe', 'pipe']})
            run.stdout.on('data', data =>{
                log(chalk.blue.bold(data.toString()))
            })
            run.on('close',(code) => {
                if(code == 0 ){
                    log(chalk.black.bgBlue.bold("Program Successully terminated") + "✅")
                    fs.unlinkSync('./a.out') 
                }
            })
        }else{
            log(chalk.yellow.bgRed.bold("File compilation unsuccessfull.") + "⚠️")
        }
    })
}else if(ext === "js"){
    const interpret = spawn('node',[file],{stdio: [process.stdin, 'pipe', 'pipe']})
    interpret.stdout.on('data', data =>{
        log(chalk.blue.bold(data.toString()))
    })
    interpret.on('close',(code) =>{
        if(code === 0 ){
            log(chalk.black.bgBlue.bold("Program Successully terminated") + "✅")
        }else{
            log(chalk.yellow.bgRed.bold("File interpretion unsuccessfull.") + "⚠️")
        }
    })
}
