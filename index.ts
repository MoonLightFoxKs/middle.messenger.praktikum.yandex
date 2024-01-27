import { Error404 } from './src/pages/404/index.ts';
import { Error500 } from './src/pages/500/index.ts';
import { LoginPage } from './src/pages/auth/login/index.ts';
import { SignUpPage } from './src/pages/auth/sign-up/index.ts';
import ChatPage from './src/pages/chat/index.ts';
import ProfilePage from './src/pages/profile/index.ts';
import { Router } from './src/utils/router.ts';

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
