import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes';
import store from '../store'
import { AuthApiGet } from '../utils/httpRequests';
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  if (to.matched.some(item => item.meta.requiresAuth)) {

    if (store.getters.hasAuth && isLoggedin) {
        next();
    } else {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
})

const isLoggedin = async () => {
  const authRes = await AuthApiGet("/auth")
  return authRes.data === "ok" ? true : false
}

export default router
