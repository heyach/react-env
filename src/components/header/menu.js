export default [
  {
    index: "0",
    name: "首页",
    route: "/",
    disabled: false,
  },
  {
    index: "1",
    name: "文章列表",
    route: "/article/list",
    disabled: false,
  },
  {
    index: "2",
    name: "练习",
    icon: "el-icon-location",
    children: [
      {
        index: "10",
        name: "numberbox",
        route: "/practice/numberbox",
        disabled: false,
      },
      {
        index: "11",
        name: "numberbox2",
        route: "/practice/numberbox2",
        disabled: false,
      },
    ]
  },
  {
    index: "4",
    name: "一个被禁用的菜单",
    route: "/",
    disabled: true,
  }
]