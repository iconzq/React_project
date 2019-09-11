/*根据之前的prevState和action来生成新的状态*/
import {combineReducers} from 'redux'
import {SAVE_USER} from './action-types'
function user(prevState = {user:{},token:''}, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data
    default:
      return prevState
  }
}

export default combineReducers({
  user
})
