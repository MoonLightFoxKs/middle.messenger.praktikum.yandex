import { errorHandling } from '../../utils/helpers';
import store from '../../utils/store';
import ChatsApi from '../chat';

class ChatsController {
  private api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async addChat(data: { title: string }) {
    const response = await this.api.addChat(data);

    try {
      errorHandling(response);

      await this.getChats();
    } catch (e) {
      alert(e);
    }
  }

  async getChats() {
    const response = await this.api.chats();

    try {
      errorHandling(response);

      store.set('chats', response.response);
    } catch (e) {
      alert(e);
    }
  }

  async addUser(data: { users: number[]; chatId: number }) {
    const response = await this.api.addUser(data);

    try {
      errorHandling(response);
    } catch (e) {
      alert(e);
    }
  }

  async getUsers(data: { id: number }) {
    const response = await this.api.getUsers(data);

    try {
      errorHandling(response);

      return response.response;
    } catch (e) {
      alert(e);
    }
  }

  async delUser(data: { users: number[]; chatId: number }) {
    const response = await this.api.delUser(data);

    try {
      errorHandling(response);
    } catch (e) {
      alert(e);
    }
  }

  async getToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new ChatsController();
