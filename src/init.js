const fs= require('fs')
const path=require('path')
let path0=path.join(__dirname,'../archive/')
if(!fs.existsSync(path0)){
    fs.mkdirSync(path0)
}
path0=path.join(__dirname,'../passwords.csv')
if(!fs.existsSync(path0)){
    fs.writeFileSync(path0,'studentId,password\n# 1x000xxxxx,xxxxxxxx\n# 1x000xxxxx,xxxxxxxx\n')
}
path0=path.join(__dirname,'../config.json')
if(!fs.existsSync(path0)){
    fs.writeFileSync(path0,
`{
    "hour":2
}`)
}
