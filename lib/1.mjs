// import a from './0.mjs'   //报错
import * as a from './0.mjs'
import {greeting} from './0.mjs'  //当存在module.exports时，无法有效运作
console.log(a)
console.log(greeting)