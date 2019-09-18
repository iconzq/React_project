/*
* 包含了n个生产对象的函数模块
* */
import {SAVE_USER,REMOVE_USER} from './action-types'

/* 保存用户数据 */
export const saveUser = (value) => ({type: SAVE_USER, data: value})

/* 清除用户数据 */
export const removeUser = () => ({type: REMOVE_USER,data: ''})
