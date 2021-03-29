import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Editer from '../views/Editer.vue';
import Classifier from '../views/Classifier.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/editer"
  },
  {
    path: "/editer",
    name: "Editer",
    component: Editer
  },
  {
    path: "/classifier",
    name: "Classifier",
    component: Classifier
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
