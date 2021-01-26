// *
// Dashboard
import DashboardIndex from '../views/Dashboard/Index.vue'
// End Dashboard
// *

import LoginPage from '../views/Login/Login.vue'

// *
// Product
import ListProduct from '../views/Product/ListProduct.vue'
import AddProduct from '../views/Product/AddProduct.vue'
import EditProduct from '../views/Product/EditProduct.vue'
import InventoryPage from '../views/Product/Inventory/Inventory.vue'
import ProductPrice from '../views/Product/ProductPrice.vue'
// End Product
// *



const routes = [
	{
		path: '/auth/login',
		name: 'LoginPage',
		component: LoginPage,
		meta: {
			group: 'dashboard',
			type: 'parent',
		},
	},

	{
		path: '/',
		redirect: '/dashboard/overview',
		name: 'Dashboard',
		meta: {
			group: 'dashboard',
			type: 'parent',
			requiresAuth: true,
		},
	},
	{
		path: '/dashboard/overview',
		name: 'Overview',
		component: DashboardIndex,
		meta: {
			group: 'dashboard',
			type: 'children',
			requiresAuth: true,

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
		path: '/product/export-prices',
		name: "Import/Export Product Prices",
		component: ProductPrice,
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
		path: '/product/:product_id/edit',
		name: 'Edit Product',
		component: EditProduct,
		meta: {
			group: 'product',
			//type: 'children'
		}
	},
	{
		path: '/product/inventory',
		name: 'Inventory',
		component: InventoryPage,
		meta: {
			group: 'product',
			type: 'add',
			//type: 'children'
		}
	},
]

export default routes;