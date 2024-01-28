import { BaseAPI } from './base.ts';

export default class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  chats(): Promise<XMLHttpRequest> {
    return this.http.get('');
  }

  addChat(data: { title: string }): Promise<XMLHttpRequest> {
    return this.http.post('', data);
  }

  addUser(data: { users: number[]; chatId: number }): Promise<XMLHttpRequest> {
    return this.http.put('/users', data);
  }

  getUsers(data: { id: number }): Promise<XMLHttpRequest> {
    return this.http.get(`/${data.id}/users`);
  }

  delUser(data: { users: number[]; chatId: number }): Promise<XMLHttpRequest> {
    return this.http.delete('/users', data);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post(`/token/${id}`);

    return response.response.token;
  }
}
