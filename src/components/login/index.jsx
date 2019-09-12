import React, {Component} from 'react'
import logo from './logo.png'
import {Form, Icon, Input, Button, message} from 'antd';
import {reqLogin} from '../../api'
import './index.less'
import {connect} from 'react-redux'
import {saveUser} from '../../redux/action-creators'

//使用connect来保存数据,传入两个参数
@connect(
  null,
  {saveUser}
)
@Form.create()
class Login extends Component {

  validator = (rule, value, callback) => {
    const name = rule.field === 'username' ? '用户名' : '密码';
    console.log(rule);
    const reg = /^[a-zA-Z0-9]{3,16}$/;
    if (!value) {
      return callback(`请输入${name}`)
    }
    if (value.length < 3) {
      return callback(`${name}最小长度是3位`)
    }
    if (value.length > 16) {
      return callback(`${name}最大长度是16位`)
    }

    if (!reg.test(value)) {
      return callback(`${name}必须是数字、字母、下划线，不能存在非法字符`)
    }
    callback()
  };

  login = (e) => {
    //  禁止默认行为
    e.preventDefault();
    //  通过表单from属性中的 validateFields 方法来校验表单
    this.props.form.validateFields((error, value) => {
      //  value 所有表单的值
      //   console.log(value)
      if (!error) {
        const {username, password} = value;
        /*使用axios发送请求
        * 使用封装好的axios发送请求时，请求地址只写后面就可以*/
        reqLogin(username, password)
          .then((result) => {
            console.log(result);
            message.success('登陆成功');
            /*保存用户数据*/
            this.props.saveUser(result)
            /*跳转到主页面*/
            this.props.history.replace('/')
          })
          .catch(() => {
            /*登录失败后清除密码,
            * resetFields--该方法来自from上面
            * 不能写在异步代码外面，最后才执行
            * 不管成功还是失败，都会触发finally*/
            this.props.form.resetFields(['password'])
          })
      }
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React后台管理系统</h1>
        </header>
        <section className="login-section">
          <h2>用户登录</h2>
          <Form onSubmit={this.login}>
            <Form.Item>
              {getFieldDecorator(
                'username',
                {
                  rules: [
                    /*{required: true, message: '请输入用户名'},
                    {min: 3, message: '最小长度是3位'},
                    {max: 16, message: '最大长度16位'},
                    {pattern: /^[a-zA-Z0-9],{3,13}$/, message: '用户名必须是数字、字母、下划线，存在非法字符'}*/
                    {validator: this.validator}
                  ]
                }
              )
              (
                <Input type="text" prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(
                'password',
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )
              (
                <Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码"/>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="formBtn">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login