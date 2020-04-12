import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/page-not-found'

Vue.use(Router)
const parseProps = route => ({ id: parseInt(route.params.id) });

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes'
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: () => import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      component: () => import(/* webpackChunkName: "bundle-heroes" */ './views/hero-detail.vue'),
      props: parseProps
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
