import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import UserList from '@/components/user/UserList'
import SimpleDetailPage from '@/components/common/SimpleDetailPage'
import UserUpdate from '@/components/user/UserUpdate'
import UserDetail from '@/components/user/UserDetail'
import UserAdd from '@/components/user/UserAdd'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        title: "首页"
      },
      children: [
        {
          path: "/helloWorld",
          name: "HelloWorld",
          component: HelloWorld,
          meta: {
            title: "欢迎页"
          }
        },
        {
          path: "/userList",
          name: "UserList",
          component: UserList,
          meta: [
            {
              name: "用户列表",
              path: "/userList"
            }
          ]
          // ,// demo 留着不删
          // children:[
          //   {
          //     path: "/simpleDetailPage",
          //     name: "SimpleDetailPage",
          //     component: SimpleDetailPage,
          //     meta: {
          //       title: "用户详情页面demo"
          //     }
          //   }
          // ]
        },
        {
          path: "/userDetail",
          name: "UserDetail",
          component: UserDetail,
          meta: [
            {
              name: "用户列表",
              path: "/userList"
            },
            {
              name: "用户详情",
              path: "/userDetail"
            }
          ]
        },
        {
          path: "/userUpdate",
          name: "UserUpdate",
          component: UserUpdate,
          meta: [
            {
              name: "用户列表",
              path: "/userList"
            },
            {
              name: "用户修改",
              path: "/userUpdate"
            }
          ]
        },
        {
          path: "/userAdd",
          name: "UserAdd",
          component: UserAdd,
          meta: [
            {
              name: "用户列表",
              path: "/userList"
            },
            {
              name: "新增用户",
              path: "/userAdd"
            }
          ]
        },
        {
          path: "/simpleDetailPage",
          name: "SimpleDetailPage",
          component: SimpleDetailPage,
          meta: [
            {
              name: "用户列表",
              path: "/userList"
            },
            {
              name: "用户详情",
              path: "/simpleDetailPage"
            }
          ]
        }
      ]
    },
    {
      path: "/",
      name: "Login",
      component: Login,
      meta: {
        title: "登录"
      }
    },

  ]
})
