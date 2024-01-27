import { errorHandling } from '../../utils/helpers.ts';
import { Router } from '../../utils/router.ts';
import store from '../../utils/store.ts';
import { AuthAPI, SigninData, SignupData } from '../auth.ts';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData) {
    const router = new Router();

    try {
      errorHandling(await this.api.signin(data));

      router.go('/messenger');
    } catch (e: unknown) {
      if ((e as Error).message === 'User already in system')
        router.go('/messenger');
      else alert(e);
    }
  }

  async signup(data: SignupData) {
    const router = new Router();

    try {
      errorHandling(await this.api.signup(data));

      router.go('/messenger');
    } catch (e) {
      alert(e);
    }
  }

  async getUser() {
    const response = await this.api.getUser();

    try {
      errorHandling(response);

      store.set('currentUser', response.response);
      console.log(store);
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async logout() {
    const router = new Router();

    try {
      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      alert(e);
    }
  }
}

export default new AuthController();
