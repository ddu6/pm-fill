# PKU Health Monitor Filler
- Require [`nodejs`](https://nodejs.org/). 

## Install
```
git clone https://github.com/ddu6/pm-fill.git
```
```
cd pm-fill
```
```
npm install
```
```
npm run init
```
Modify `passwords.csv`. 

## Fill
```
npm run fill
```
Screenshots will be saved in `archive`. 

## Cycle
Modify `config.json`. 
```
nohup npm run cycle &
```
