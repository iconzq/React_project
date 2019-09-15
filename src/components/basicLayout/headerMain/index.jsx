import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import { Button,Icon } from 'antd'
import './index.less'
export default class Index extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="header_main">
                <div className="header_main_top">
                  <Button size="small"><Icon type="fullscreen"/></Button>
                  <Button size="small" className="header_main_btn">English</Button>
                  <span>欢迎，xxx</span>
                  <Button type="link">退出</Button>
                </div>
                <div className="header_main_bottom">
                  <h3>首页</h3>
                  <span>2019.10.101.1</span>
                </div>
            </div>
        )
    }
}