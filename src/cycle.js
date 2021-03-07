const {fillAll}=require('./base.js')
const path=require('path')
const fs=require('fs')
const config=JSON.parse(fs.readFileSync(path.join(__dirname,'../config.json'),{encoding:'utf8'}))
let hour=config.hour
if(typeof hour!=='number')hour=2
else if(isNaN(hour)||hour%1!==0||hour<0||hour>23)hour=2
const now=new Date().getHours()
if(hour<now)hour+=24
const delta=(hour-now)*3600000
setTimeout(() => {
    fillAll()
    setInterval(fillAll,24*3600000)
}, delta)