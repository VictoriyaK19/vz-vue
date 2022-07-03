import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomeView from '../views/HomeView.vue'
import Indications from '../views/Indications.vue'
import ClientView from '../views/ClientView.vue'
import Login from '../views/Login.vue'
import Taxes from '../views/Taxes.vue'
import Payments from '../views/Payments.vue'
import EditClient from '../views/EditClient.vue'
import Archive from '../views/Archive.vue'
import Reporting from '../views/Reporting.vue'
import AddClient from '../views/AddClient.vue'
import ErrorView from '../views/ErrorView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/indications',
    name: 'indications',
    component: Indications
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/client/:id',
    name: 'client',
    component: ClientView
  },
  {
    path: '/taxes',
    name: 'taxes',
    component: Taxes,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/payments',
    name: 'payments',
    component: Payments,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/edit/:id',
    name: 'edit-client',
    component: EditClient,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/reporting',
    name: 'reporting',
    component: Reporting,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/add-client',
    name: 'add-client',
    component: AddClient,
    meta: {
      requireLogin: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'error-page',
    component: ErrorView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
