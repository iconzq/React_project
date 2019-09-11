/*根据之前的prevState和action来生成新的状态*/
import {combineReducers} from 'redux'
import {SAVE_USER} from './action-types'
import {setItem, getItem} from '../utils/storage'

const initUser = {
  user: getItem('user') || {},
  token: getItem('token') || ''
};

function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      /*在内存存储之前进行持久化存储*/
      setItem('user', action.data.user);
      setItem('token', action.data.token);
      return action.data;
    default:
      return prevState
  }
}

export default combineReducers({
  user
})
