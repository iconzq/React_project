import React,{Component} from 'react'
import withCheckLogin from '../../contaniers/withCheckLogin/withCheckLogin'

/* 加入登录判断，如果登陆了就直接进入主页面，没有就返回登录页面重新登陆 */
@withCheckLogin

 class NotMatch extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                NotMatch
            </div>
        )
    }
}

export default NotMatch