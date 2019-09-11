/*
* 包含了n个生产对象的函数模块
* */
import {SAVE_USER} from './action-types'
export const saveUser = (value) => ({type:SAVE_USER,data : value})
