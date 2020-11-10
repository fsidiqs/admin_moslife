import Vue from 'vue'
import VueRouter from 'vue-router'

// *
// Dashboard
import DashboardIndex from '../views/Dashboard/Index.vue'
// End Dashboard
// *

// *
// Product
import ListProduct from '../views/Product/ListProduct.vue'
import AddProduct from '../views/Product/AddProduct.vue'
import EditProduct from '../views/Product/EditProduct.vue'
// End Product
// *

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard/overview',
    name: 'Dashboard',
    meta: {
      group: 'dashboard',
      type: 'parent'
    },
  },
  {
    path: '/dashboard/overview',
    name: 'Overview',
    component: DashboardIndex,
    meta: {
      group: 'dashboard',
      type: 'children'
    }
  },
  {
    path: '/product',
    redirect: '/product/list',
    name: 'Products',
    meta: {
      group: 'product',
      type: 'parent'
    },
  },
  {
    path: '/product/list',
    name: 'All Products',
    component: ListProduct,
    meta: {
      group: 'product',
      type: 'children'
    }
  },
  {
    path: '/product/add',
    name: 'Add Product',
    component: AddProduct,
    meta: {
      group: 'product',
      type: 'add',
      //type: 'children'
    }
  },
  {
    path: '/product/edit',
    name: 'Edit Product',
    component: EditProduct,
    meta: {
      group: 'product',
      //type: 'children'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
