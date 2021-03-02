const fs= require('fs')
const path=require('path')
const path0=path.join(__dirname,'../password.csv')
if(!fs.existsSync(path0)){
    fs.writeFileSync(path0,'studentId,password\n# 1x000xxxxx,xxxxxxxx\n# 1x000xxxxx,xxxxxxxx\n')
}
const path1=path.join(__dirname,'../archive/')
if(!fs.existsSync(path1)){
    fs.mkdirSync(path1)
}
const path2=path.join(__dirname,'../config.json')
if(!fs.existsSync(path2)){
    fs.writeFileSync(path2,
`{
    "hour":2
}`)
}