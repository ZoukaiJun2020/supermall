import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import('../view/home/Home')
const Category = () => import('../view/category/Category')
const Profile = () => import('../view/profile/Profile')
const Cart = () => import('../view/cart/Cart')
const Detail = () => import('../view/detail/Detail')

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象，配置路由信息

const routes = [
  {
    path: '',
    redirect: '/home' ,

  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path:'/detail/:iid',
    component: Detail
  }

]
const router = new VueRouter({
  routes,
  mode: 'history'
})


//3.导出
export default router
