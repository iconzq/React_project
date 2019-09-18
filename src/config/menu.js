
const menu = [
  {
    icon: 'home',
    title: 'menu.home',
    key: '/'
  },
  {
    icon: 'appstore',
    title: 'menu.products',
    key: '/products',
    children: [
      {
        icon: 'bars',
        title: 'menu.category',
        key: '/category'
      },
      {
        icon: 'tool',
        title: 'menu.product',
        key: '/product'
      }
    ]
  },
  {
    icon: 'user',
    title: 'menu.user',
    key: '/user'
  },
  {
    icon: 'safety',
    title: 'menu.role',
    key: '/role'
  },
  {
    icon: 'area-chart',
    title: 'menu.charts',
    key: '/charts',
    children: [
      {
        icon: 'bar-chart',
        title: 'menu.bar',
        key: '/charts/bar'
      },
      {
        icon: 'line-chart',
        title: 'menu.line',
        key: '/charts/line'
      },
      {
        icon: 'pie-chart',
        title: 'menu.pie',
        key: '/charts/pie'
      }
    ]
  },
];

export default menu;