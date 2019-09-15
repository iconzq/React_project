import React, {Component} from 'react'
import {Layout, Breadcrumb} from 'antd';
import logo from '../../assets/img/logo.png'
import LeftNav from './left-nav/leftNav'
import './index.less'
import withCheckLogin from '../../contaniers/withCheckLogin/withCheckLogin'

const {Header, Content, Footer, Sider} = Layout;

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
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="basic-layout-logo">
            <img src={logo} alt="logo"/>
            <h1 style={{display: this.state.isDisplay ? 'block' : 'none'}}>尚硅谷后台</h1>
          </div>

          <LeftNav/>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}/>
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
          <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout