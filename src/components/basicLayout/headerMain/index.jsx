import React, {Component} from 'react'
import {Button, Icon, Modal} from 'antd'
import screenfull from 'screenfull'
import {withTranslation, getI18n} from 'react-i18next';
import {connect} from 'react-redux'

import './index.less'
import {removeUser} from "../../../redux/action-creators";

/* 该高阶组件传入两个属性  t  i18n */
@withTranslation()
@connect(
  /* 状态数据 */
  (state) => ({username: state.user.user.username}),
  /* 操作状态数据的方法 */
  {removeUser}
)
class Index extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    isScreenFull: false,
    isEnglish: getI18n().language === 'en'
  };
  fullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      /* 当按 esc 退出时出现图标不改变问题 */
      /*this.setState({
        isScreenFull:!this.state.isScreenFull
      })*/
    }
  };

  /* 事件只会触发一次 元素即将挂载的时候绑定事件 */
  componentDidMount() {
    screenfull.on('change', () => {
      this.setState({
        isScreenFull: !this.state.isScreenFull
      })
    });
  }

  /* 在组价卸载时解绑事件 */
  componentWillMount() {
    screenfull.off('change', () => {
      this.setState({
        isScreenFull: !this.state.isScreenFull
      })
    });
  }

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.state.isEnglish ? 'zh-CN' : 'en');
    this.setState({
      isEnglish: !this.state.isEnglish
    })
  };

  logout = () => {
    /* 显示对话框 */
    Modal.confirm({
      title: "您确认要退出登录吗？",
      /* 确认的回调函数 */
      onOk: () => {
        /* 退出时要清除所有数据 redux 浏览器 等*/
        /* 清除 redux */
        /* 移除数据后，会自动来到登录界面，通过登录校验实现 */
        this.props.removeUser();
      },
      onCancel: () => {}, /* 取消的回调函数  定义和不定义一样 */
      okText: '确认', /* 确认文本 */
      cancelText: '取消' /* 取消文本 */
    })
  };

  render() {
    const {isScreenFull, isEnglish} = this.state;
    const {username} = this.props;
    return (
      <div className="header_main">
        <div className="header_main_top">
          <Button size="small" onClick={this.fullScreen}><Icon type={isScreenFull ? 'fullscreen-exit' : 'fullscreen'}/></Button>
          <Button size="small" className="header_main_btn"
                  onClick={this.changeLanguage}>{isEnglish ? 'English' : '中文'}</Button>
          <span>欢迎，{username}</span>
          <Button type="link" onClick={this.logout}>退出</Button>
        </div>
        <div className="header_main_bottom">
          <h3>首页</h3>
          <span>2019.10.101.1</span>
        </div>
      </div>
    )
  }
}

export default Index