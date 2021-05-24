import Vue from 'vue';
import VueRouter from 'vue-router';
import SignsEditor from '../views/SignsEditor.vue';
import classEditor from '../views/ClassEditor.vue';
import ClassWithSigns from '../views/ClassWithSigns.vue';
import CheckKnowledgeBase from '../views/CheckKnowledgeBase.vue';
import Classifier from '../views/Classifier.vue';

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

  {
    path: '/checkKnowledgeBase',
    name: 'checkKnowledgeBase',
    component: CheckKnowledgeBase,
  },

  {
    path: '/classifier',
    name: 'classifier',
    component: Classifier,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
