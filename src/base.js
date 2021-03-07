const { chromium } = require('playwright-chromium')
const csv=require('csv')
const path=require('path')
const fs=require('fs')
async function fillAll(){
    const string0=fs.readFileSync(path.join(__dirname,'../passwords.csv'),{encoding:'utf8'})
    const array0=await new Promise(resolve=>{
        csv.parse(string0,{columns:true,comment:'#',trim:true,skip_lines_with_error:true},
        (err,val)=>{
            if(err)throw err
            resolve(val)
        })
    })
    if(array0.length===0)throw new Error('empty')
    for(let i=0;i<array0.length;i++){
        const {studentId,password}=array0[i]
        if(typeof studentId!=='string'||typeof password!=='string')continue
        await fillOne(studentId,password)
    }
}
async function fillOne(studentId,password){
    const browser = await chromium.launch()
    const context = await browser.newContext({
        viewport: { width: 500, height: 2000 }
    })
    const page = await context.newPage()
    await page.goto('https://portal.pku.edu.cn/')
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
module.exports.fillAll=fillAll