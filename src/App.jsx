import React, {Component} from 'react'
import {BrowserRouter as Router, Route,} from 'react-router-dom'
import routes from './config/routes'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        {/* exact 严格匹配，只匹配path里的路由 */}
        {
          routes.map((route, index) => {
            return <Route {...route} key={index}/>
          })
        }
      </Router>
    )
  }
}