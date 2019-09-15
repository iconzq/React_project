import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

/* 自定义高阶组件，来实现登录验证功能 */
function withCheckLogin(WrappedComponent) {
  return connect((state) => {
    return {token: state.user.token}
  }, null)(
    class extends Component {
      static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

      render() {
        const {token, ...rest} = this.props;
        const {location:{pathname}} = rest;
        if (pathname === '/login' && token) return <Redirect to="/"/>;
        if (pathname !== '/login' && !token) return <Redirect to="/login"/>;
        return <WrappedComponent {...rest}/>
      }
    }
  )
}

export default withCheckLogin