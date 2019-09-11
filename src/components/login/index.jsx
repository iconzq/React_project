import React, {Component} from 'react'
import logo from './logo.png'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import axios from 'axios'
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
  constructor(props) {
    super(props)
  }

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
        //  使用axios发送请求
        axios.post('http://localhost:3000/api/login', {username, password})
            .then((response) => {
              console.log(response);
              if (response.data.status === 0) {
                message.success('登陆成功');
                /*保存用户数据*/
                this.props.saveUser(response.data.data)
                /*跳转到主页面*/
                this.props.history.replace('/')
              }
            })
            .catch((err) => {
              message.error('网络错误，登录失败~~')
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