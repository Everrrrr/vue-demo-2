import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComments from '../views/MyComments.vue'
import MyStar from '../views/MyStar.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import TabEdit from '../views/TabEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit,
  },
  {
    path: '/myfollow',
    name: 'myfollow',
    component: MyFollow,
  },
  {
    path: '/mycomments',
    name: 'mycomments',
    component: MyComments,
  },
  {
    path: '/mystar',
    component: MyStar,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/tabedit',
    component: TabEdit,
    name: 'tabedit',
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
