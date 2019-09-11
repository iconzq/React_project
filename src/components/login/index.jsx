import React, {Component} from 'react'
import logo from './logo.png'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import './index.less'

@Form.create()
class Login extends Component {
  constructor(props) {
    super(props)
  }

  validator = (rule, value, callback) => {
    const name = rule.file === 'username' ? '用户名' : '密码'
    const reg = /^[a-zA-Z0-9],{4,16}$/
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
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
        <div className="login">
          <header className="login-header">
            <img src={logo} alt="logo"/>
            <h1>React后台管理系统</h1>
          </header>
          <section className="login-section">
            <h2>用户登录</h2>
            <Form>
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
                    <Input type="text" prefix={<Icon type="user"/>}/>
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
                    <Input type="password" prefix={<Icon type="lock"/>}/>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="submit" className="formBtn">登录</Button>
              </Form.Item>
            </Form>
          </section>
        </div>
    )
  }
}

export default Login