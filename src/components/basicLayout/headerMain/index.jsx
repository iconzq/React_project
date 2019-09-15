import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import { Button,Icon } from 'antd'
import screenfull from 'screenfull'
import './index.less'
export default class Index extends Component{
    constructor(props){
        super(props)
    }

    state = {
      isScreenFull:false
    }
  fullScreen = () => {
    if (screenfull.isEnabled){
      screenfull.toggle();
      /* 当按 esc 退出时出现图标不改变问题 */
      /*this.setState({
        isScreenFull:!this.state.isScreenFull
      })*/
    }
  }

  /* 事件只会触发一次 元素即将挂载的时候绑定事件 */
  componentDidMount() {
    screenfull.on('change', () => {
      this.setState({
        isScreenFull:!this.state.isScreenFull
      })
    });
  }

  /* 在组价卸载时解绑事件 */
  componentWillMount() {
    screenfull.off('change', () => {
      this.setState({
        isScreenFull:!this.state.isScreenFull
      })
    });
  }

  render(){
      const {isScreenFull} = this.state
        return(
            <div className="header_main">
                <div className="header_main_top">
                  <Button size="small" onClick={this.fullScreen}><Icon type={isScreenFull ? 'fullscreen-exit':'fullscreen'}/></Button>
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