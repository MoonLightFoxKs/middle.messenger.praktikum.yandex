import { errorHandling } from '../../utils/helpers.ts';
import store from '../../utils/store.ts';
import UserApi, { UserData, UserPassword } from '../user.ts';

class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async updateProfile(data: UserData) {
    const response = await this.api.putProfile(data);

    try {
      errorHandling(response);

      store.set('currentUser', response.response);
    } catch (e) {
      alert(e);
    }
  }

  async updatePassword(data: UserPassword) {
    const response = await this.api.putPassword(data);

    try {
      errorHandling(response);
    } catch (e) {
      alert(e);
    }
  }

  async search(data: { login: string }) {
    const response = await this.api.postSearch(data);

    try {
      errorHandling(response);
      return response.response;
    } catch (e) {
      alert(e);
    }
  }

  async updateAvatar(data: FormData) {
    const response = await this.api.putAvatar(data);

    try {
      errorHandling(response);
      store.set('currentUser', response.response);
    } catch (e) {
      alert(e);
    }
  }
}

export default new UserController();
