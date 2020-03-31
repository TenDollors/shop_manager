import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)
Vue.use(login)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})
// 添加路由收尾 beforeEach导航收尾
// to表示将要访问你的路径 from 从哪里 next是下一个要进行的操作
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next() // 放行
  }
  // 对用户访问的路由进行拦截，如果访问的是登录页直接放行
  const token = window.sessionStorage.getItem('token')
  if (!token) { // 没有token
    return next('/login')
  }
  next()
})
// 如果访问的不是登录页 则我们需要来检测用户是否登陆

export default router
