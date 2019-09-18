import React, {Component} from 'react'
import {Layout, Breadcrumb} from 'antd';
import { withTranslation } from 'react-i18next';


import logo from '../../assets/img/logo.png'
import LeftNav from './left-nav/leftNav'
import './index.less'
import HeaderMain from './headerMain'
import withCheckLogin from '../../contaniers/withCheckLogin/withCheckLogin'

const {Header, Content, Footer, Sider} = Layout;


@withTranslation()
/* 加入登录判断，如果登陆了就直接进入主页面，没有就返回登录页面重新登陆 */
@withCheckLogin
class BasicLayout extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      isDisplay:!this.state.isDisplay
    });
  };

  render() {
    const {t} = this.props

    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="basic-layout-logo">
            <img src={logo} alt="logo"/>
            <h1 style={{display: this.state.isDisplay ? 'block' : 'none'}}>{t('title')}</h1>
          </div>

          <LeftNav/>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0,height:80}}>
            <HeaderMain/>
          </Header>
          <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              {/* 显示子元素 */}
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>欢迎使用硅谷后台管理系统~~</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout