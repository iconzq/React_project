// 为了让路径和 key 对应起来，将 key 设置为路径
const menu = [
  {
    icon: 'home',
    title: '首页',
    key: '/'
  }, {
    icon: 'appstore',
    title: '商品管理',
    key: '/products',
    children: [
      {
        icon: 'bars',
        title: '首页',
        key: '/category',
      }, {
        icon: 'home',
        title: '首页',
        key: '/product'
      }
    ]
  }, {
    icon: 'user',
    title: '用户管理',
    key: '/user'
  }, {
    icon: 'lock',
    title: '权限管理',
    key: '/role'
  }, {
    icon: 'appstore',
    title: '商品管理',
    key: '/charts',
    children: [
      {
        icon: 'home',
        title: '首页',
        key: '/charts/bar',
      }, {
        icon: 'home',
        title: '首页',
        key: '/charts/line'
      }, {
        icon: 'pie-chart',
        title: 'menus.pie',
        key: '/charts/pie'
      }
    ]
  }
]

export default menu