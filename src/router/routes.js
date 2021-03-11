import Home from '../pages/home/Home'
import A from '../pages/home/A'
import Login from '../pages/login/Login'
import Todo from '../pages/todolist/Todo'

import User from '../pages/user/User'
import UserInfo from '../pages/user/userinfo/UserInfo'
import MyArticle from "../pages/user/myarticle/MyArticle"

import Article from '../pages/article/Article'
import ArticleList from '../pages/article/list/List'
import ArticleDetail from '../pages/article/detail/Detail'
import ArticleRelease from '../pages/article/release/Release'

import Practice from "../pages/practice/Practice"
import NumberBox from "../pages/practice/numberbox/NumberBox"
import NumberBox2 from "../pages/practice/numberbox2/NumberBox2"
import State from "../pages/practice/state/State"

const authRoute = "/login"

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/home',
    component: Home,
    title: "home",
    redirect: "/home/a",
    children: [{
      path: "/home/a",
      component: A,
      exact: true,
    }]
  },
  {
    path: '/practice',
    component: Practice,
    title: "practice",
    redirect: "/practice/numberbox",
    children: [{
      path: "/practice/numberbox",
      component: NumberBox,
      exact: true,
    },{
      path: "/practice/numberbox2",
      component: NumberBox2,
      exact: true,
    },{
      path: "/practice/state",
      component: State,
      exact: true,
    }]
  },
  {
    path: '/todo',
    component: Todo,
    exact: true,
    auth: false,
    authRoute: authRoute
  },
  {
    path: '/user',
    component: User,
    redirect: "/user/userinfo",
    children: [{
      path: "/user/userinfo",
      component: UserInfo,
      exact: true,
    },{
      path: "/user/myarticle",
      component: MyArticle,
      exact: true,
    }],
  },
  {
    path: '/article',
    component: Article,
    redirect: "/article/list",
    children: [{
      path: "/article/list",
      component: ArticleList,
      exact: true,
    }, {
      path: "/article/detail/:id",
      component: ArticleDetail,
      exact: true,
    }, {
      path: "/article/release",
      component: ArticleRelease,
      exact: true,
    }],
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
]

export { routes }
