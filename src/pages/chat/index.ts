import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { ImgButton } from '../../components/img-button';
import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { ButtonTag, ButtonType, InputType } from '../../constants';
import { Block } from '../../utils/block';
import { Router } from '../../utils/router';
import { ChatData, withStore } from '../../utils/store';
import template from './chat.pug';
import ChatsController from '../../api/controllers/chat';
import { ChatPreview } from '../../components/chat-preview';
import { Chat } from '../../components/chat';

class ChatPage extends Block {
  constructor(props?: any) {
    super(
      {
        tagName: 'div',
        className: 'chatPage',
      },
      {
        isNoChat: true,
        ...props,
      }
    );
  }

  init(): void {
    this.children.addChatButton = new ImgButton({
      imgSrc: '/img/add.svg',
      alt: 'add chat',
      className: 'addChatButton',
      onClick: () => {
        this.setProps({
          addChat: true,
        });
      },
    });

    this.children.addChatModal = new Modal({
      name: 'Создать чат',
      close: () => {
        this.setProps({
          addChat: false,
        });
      },
      content: [
        new Form({
          inputs: [
            new Input({
              name: 'title',
              type: InputType.text,
              placeholder: 'Название чата',
            }),
          ],
          buttonProps: {
            type: ButtonType.submit,
            name: 'Сохранить',
            className: 'addChatSubmit',
            callback: (data: any) => {
              ChatsController.addChat(data).then(() =>
                this.setProps({
                  addChat: false,
                })
              );
            },
          },
        }),
      ],
    });

    this.children.profileButton = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'Профиль',
      onClick: () => {
        const router = new Router();
        router.go('/settings');
      },
    });

    this.children.search = new Input({
      type: InputType.text,
      placeholder: 'поиск',
      name: 'search',
      className: 'searchInput',
    });

    if (this.props.chats)
      this.children.chatPreviewList = this.props.chats.map((data: ChatData) => {
        const el = new ChatPreview({
          id: data.id,
          name: data.title,
          message: data.last_message?.content,
        });
        el.setProps({
          events: {
            click: async () => {
              this.children.chat = new Chat({
                name: el.element?.querySelector('.name')?.innerHTML!,
              });
              if (Array.isArray(this.children.chatPreviewList)) {
                this.children.chatPreviewList.forEach((elem) => {
                  elem.getContent()?.classList.remove('active');
                });
              }
              el.getContent()?.classList.add('active');
              this.setProps({
                isNoChat: false,
              });
            },
          },
        });
        return el;
      });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Page = withStore((state) => ({ chats: state.chats }));

export default Page(ChatPage);
