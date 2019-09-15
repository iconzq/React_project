import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'

import {Icon, Layout, Menu} from "antd";
import menu from '../../../config/menu'

const {SubMenu} = Menu;

@withRouter

 class LeftNav extends Component{

    constructor(props){
        super(props)
    }

  createMenu = () => {
   return  menu.map((menu) => {
      //判断菜单结构,如果有 children 属性，就是二级菜单，没有就是一级菜单
      if (menu.children){
        return  (
          <SubMenu
            key={menu.key}
            title={
              <span>
                  <Icon type={menu.icon}/>
                  <span>{menu.title}</span>
                </span>
            }
          >
            {
              menu.children.map((cMenu) => {
                return (
                  <Menu.Item key={cMenu.key}>
                    <Link to={cMenu.key}>
                      <Icon type={cMenu.icon}/>
                      <span>{cMenu.title}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={menu.key}>
            <Link to={menu.key}>
              <Icon type={menu.icon}/>
              <span>{menu.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }

    render(){
      const menu = this.createMenu()
      const {pathname} = this.props.location
        return(
          /* theme 调整主题  defaultSelectedKeys：默认选中（值为 元素的 key 属性 ）
          *  使用 Link 组件切换地址
          * */
          <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
            {menu}
          </Menu>
        )
    }
}

export default LeftNav