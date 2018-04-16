import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
const Calc = () => import('@/components/Calc');
const Socket = () => import('@/components/Socket');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/calc',
      name: 'Calc',
      component: Calc
    },
    {
      path: '/socket',
      name: 'Socket',
      component: Socket
    }
  ]
})
