#! /usr/bin/env node 

const chalk = require("chalk")
const {spawn} = require('child_process')
const {log} = require('console')
const fs = require("fs") 

const file = process.argv[2]
const ext = file.split(".").pop()

if(ext == "cpp"){
    const compile = spawn('g++' , [file],{stdio: ['ignore','pipe','pipe']})
    compile.on('close',code => {
        if(code === 0){
            const run =  spawn('./a.out', {stdio: [process.stdin, 'pipe', 'pipe']})
            run.stdout.on('data', data =>{
                log(data.toString())
            })
            run.on('close',(code) => {
                if(code == 0 ){
                    fs.unlinkSync('./a.out') 
                }
            })
        }else{
            log(chalk.red.bold("File compilation unsuccessfull.") + "⚠️")
        }
    })
}


