import Vue from 'vue';
import VueRouter from 'vue-router';
import SignsEditor from '../views/SignsEditor.vue';
import classEditor from '../views/ClassEditor.vue';
import ClassWithSigns from '../views/ClassWithSigns.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'classEditor',
  },
  {
    path: '/classEditor',
    name: 'classEditor',
    component: classEditor,
  },
  {
    path: '/signsEditor',
    name: 'signsEditor',
    component: SignsEditor,
  },

  {
    path: '/classWithSigns',
    name: 'classWithSigns',
    component: ClassWithSigns,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
