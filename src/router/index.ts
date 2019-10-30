import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Quiz from '../views/Quiz.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: Quiz,
    props: true,
    beforeEnter: (to: any, from: any, next: any) => {
      if (to.params.time) next();
      else next({ name: 'home' });
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
