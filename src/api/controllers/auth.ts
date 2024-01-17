import { errorHandling } from '../../utils/helpers';
import { Router } from '../../utils/router';
import { store } from '../../utils/store';
import { AuthAPI, SigninData, SignupData } from '../auth';

class AuthController {
  private readonly api: AuthAPI;
  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SigninData) {
    const router = new Router();

    try {
      errorHandling(await this.api.signin(data));
      await this.getUser();

      router.go('/messenger');
    } catch (e) {
      if (e === 'User already in system') router.go('/messenger');
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
    const response = await this.api.user();

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
