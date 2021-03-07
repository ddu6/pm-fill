const { chromium } = require('playwright-chromium')
const csv=require('csv')
const path=require('path')
const fs=require('fs')
async function parseCSV(string){
    const result=await new Promise((resolve)=>{
        csv.parse(string,{
            columns:true,
            comment:'#',
            trim:true,
            skip_lines_with_error:true
        },(err,val)=>{
            if(err)throw err
            resolve(val)
        })
    })
    return result
}
async function fillAll(){
    const passwords=await parseCSV(fs.readFileSync(path.join(__dirname,'../passwords.csv'),{encoding:'utf8'}))
    if(passwords.length===0)throw new Error('passwords.csv is not filled in correctly.')
    for(let i=0;i<passwords.length;i++){
        const {studentId,password}=passwords[i]
        if(typeof studentId!=='string'||typeof password!=='string')continue
        await fillOne(studentId,password)
    }
}
async function fillOne(studentId,password){
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext({
        viewport: { width: 500, height: 2000 }
    })
    const page = await context.newPage()
    await page.goto('https://portal.pku.edu.cn/portal2017/login.jsp')
    await page.fill('#user_name',studentId)
    await page.fill('#password',password)
    await page.click('#logon_button')
    await page.waitForSelector('#fav_epidemic')
    await page.goto('https://portal.pku.edu.cn/portal2017/util/appSysRedir.do?appId=epidemic')
    await page.click('[for="sfczzz"] +div>:has(input[value="n"])')
    await page.click('[for="yqzd"] +div')
    await page.click('li:has(:text("健康"))')
    await page.click('button:has(:text("保存今日信息"))')
    await page.waitForTimeout(1000)
    const date=new Date()
    const dateStr=(date.getMonth()+1).toString().padStart(2,'0')+'-'+date.getDate().toString().padStart(2,'0')
    await page.screenshot({ path: path.join(__dirname,`../archive/${dateStr}-${studentId}.png`) })
    await browser.close()
}
async function cycle(){
    const config=JSON.parse(fs.readFileSync(path.join(__dirname,'../config.json'),{encoding:'utf8'}))
    let hour
    const tmp=config.hour
    if(typeof tmp!=='number'
        ||isNaN(tmp)
        ||tmp%1!==0
        ||tmp<0
        ||tmp>23
    )hour=2
    else hour=tmp
    const now=new Date().getHours()
    if(hour<now)hour+=24
    const delta=(hour-now)*3600000
    setTimeout(() => {
        fillAll()
        setInterval(fillAll,24*3600000)
    }, delta)
}
module.exports.fillAll=fillAll
module.exports.cycle=cycle
