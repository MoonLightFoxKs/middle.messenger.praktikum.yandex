import { BaseAPI } from './base';

export type UserData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UserPassword = {
  oldPassword: string;
  newPassword: string;
};

export default class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  putProfile(data: UserData): Promise<XMLHttpRequest> {
    return this.http.put('/profile', data);
  }

  putPassword(data: UserPassword): Promise<XMLHttpRequest> {
    return this.http.put('/password', data);
  }

  postSearch(data: { login: string }): Promise<XMLHttpRequest> {
    return this.http.post('/search', data);
  }

  putAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.http.put('/profile/avatar', data, true);
  }
}
