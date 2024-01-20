import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { ImgButton } from '../../components/img-button';
import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import { ButtonTag, ButtonType, InputType } from '../../constants';
import { Block } from '../../utils/block';
import { Router } from '../../utils/router';
import { ChatData, store, withStore } from '../../utils/store';
import template from './chat.pug';
import ChatsController from '../../api/controllers/chat';
import MessageController from '../../api/controllers/message';
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

    this.children.chat = new Chat({});

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
              const token = await ChatsController.getToken(data.id);
              await MessageController.connect(data.id, token);

              this.children.chat = new Chat({
                id: data.id,
                name: data.title,
                message: data.last_message?.content,
                messages: store.getState().messages![data.id],
              });

              // if (!Array.isArray(this.children.chat))
              //   this.children.chat.setProps({
              //     chat: data,
              //     name: data.title,
              //   });
              // (this.children.chat as any).init();

              // this.children.chat.setProps({
              //   chat: data,
              // });

              //ПОМИДОРЫ ПОМОГИТЕ
              // if (!Array.isArray(this.children.chat))
              //   this.children.chat.setProps({
              //     name: el.element?.querySelector('.name')?.innerHTML!,
              //     id: data.id,
              //     // messages: this.props.messages,
              //   });

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

const Page = withStore((store) => ({
  chats: store.chats,
  messages: store.messages,
}));

console.log(Page);

export default Page(ChatPage);
