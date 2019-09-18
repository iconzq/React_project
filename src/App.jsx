import React, {Component,Suspense} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {Spin} from 'antd'

import routes from './config/routes'
import NotMatch from './components/notMatch/notMatch'
import BasicLayout from './components/basicLayout/basicLayout'
import login from './contaniers/login'

export default class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Suspense fallback={<Spin size="large"/>}>
        {/* 只切换 中间部分 */}
        <Router>
          <Switch>
            <Route path="/login" component={login} exact/>
            <BasicLayout>
              <Switch>
                {/* exact 严格匹配，只匹配path里的路由 */}
                {
                  routes.map((route, index) => {
                    return <Route {...route} key={index}/>
                  })
                }
                {/* 未匹配上的路由显示 notmatch 组件 */}
                <Route component={NotMatch}/>
              </Switch>
            </BasicLayout>
          </Switch>
        </Router>
      </Suspense>
    )
  }
}