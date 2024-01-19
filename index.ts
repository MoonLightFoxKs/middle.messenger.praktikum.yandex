import { Error404 } from './src/pages/404';
import { Error500 } from './src/pages/500';
import { LoginPage } from './src/pages/auth/login';
import { SignUpPage } from './src/pages/auth/sign-up';
import ChatPage from './src/pages/chat';
import ProfilePage from './src/pages/profile';
import { Router } from './src/utils/router';

window.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  router
    .use('/', LoginPage)
    .use('/404', Error404)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatPage)
    .use('/sign-up', SignUpPage)
    .use('/500', Error500);

  router.start();
});
