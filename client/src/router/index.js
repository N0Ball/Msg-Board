import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PostView from '../views/PostView.vue';
import MessageView from '../views/MessageView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/post',
      name: 'post',
      meta: { requireAuth: true },
      component: PostView
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView
    }
  ]
});

router.beforeEach(async(to, from, next) => {

  if (to.meta.requireAuth) {

    const info = localStorage.getItem('token');

    if (info) {

      next();

    } else {

      next({ name: 'login' });

    }

  } else {
    next();
  }
})

export default router;
