import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserList from '@/components/user/UserList'
import SimpleDetailPage from '@/components/common/SimpleDetailPage'
import UserDetail from '@/components/user/UserDetail'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/userList",
      name: "UserList",
      component: UserList,
      meta: {
        title: "用户管理"
      }
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
})
