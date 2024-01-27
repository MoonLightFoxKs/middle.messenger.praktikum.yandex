import { ButtonTag, ButtonType, InputType } from '../../constants';
import Block from '../../utils/block';
import { Button } from '../button';
import { ImgButton } from '../img-button';
import { Input } from '../input';
import { Modal } from '../modal';
import template from './chat.pug';
import ChatsController from '../../api/controllers/chat';
import { User, withStore } from '../../utils/store';
import { Form } from '../form';
import UserController from '../../api/controllers/user';
import { validateInput } from '../../utils/validate-input';
import MessageController from '../../api/controllers/message';

export class Chat extends Block {
  constructor(props: any) {
    super(
      { tagName: 'div', className: 'chatContainer' },
      {
        messages: new Array(''),
        ...props,
      },
    );
  }

  private addMessage = () => {
    if (
      !Array.isArray(this.children.messageInput) &&
      this.children.messageInput
    ) {
      const el = this.children.messageInput.getContent();
      const value = el!.querySelector('input')!.value;

      const resultValidation = validateInput(el!);

      if (resultValidation.verify) {
        MessageController.sendMessage(this.props.id, value);

        this.children.messageInput.setProps({
          value: '',
        });
      }
    }
  };

  init() {
    this.children.settingsButton = new ImgButton({
      imgSrc: '/img/chat-settings.svg',
      alt: 'chat settings',
      className: 'settingsButton',
      onClick: () => {
        this.setProps({
          openSettings: true,
        });
      },
    });

    this.children.settingsModal = new Modal({
      name: '',
      close: () => {
        this.setProps({
          openSettings: false,
        });
      },
      content: [
        new Button({
          type: ButtonType.button,
          name: 'Добавить пользователя в чатик',
          className: 'settingsButtonInModal',
          onClick: async () => {
            this.setProps({
              openSettings: false,
              addUser: true,
            });
          },
        }),
        new Button({
          type: ButtonType.button,
          name: 'Удалить пользователя из чатика',
          className: 'settingsButtonInModal',
          onClick: async () => {
            ChatsController.getUsers({ id: this.props.id }).then(
              (user: Omit<User, 'phone' | 'email'>[]) => {
                this.children.delUser = new Modal({
                  name: 'Удалить из чата',
                  close: () => {
                    this.setProps({
                      isDelUser: false,
                    });
                  },
                  content: user.map((el) => {
                    const button = new Button({
                      tag: ButtonTag.link,
                      name: el.login,
                      type: ButtonType.button,
                      onClick: () => {
                        ChatsController.delUser({
                          users: [el.id],
                          chatId: this.props.id,
                        });
                        this.setProps({
                          isDelUser: false,
                        });
                      },
                    });

                    return button;
                  }),
                });
                this.setProps({
                  openSettings: false,
                  isDelUser: true,
                });
              },
            );
          },
        }),
      ],
    });

    this.children.addUserModal = new Modal({
      name: 'Добавить в чатик',
      close: () => {
        this.setProps({
          addUser: false,
        });
      },
      content: [
        new Form({
          inputs: [
            new Input({
              type: InputType.text,
              name: 'login',
              placeholder: 'Поиск пользователя',
              onEnter: (event: KeyboardEvent) => {
                event.preventDefault();
              },
            }),
          ],
          buttonProps: {
            type: ButtonType.button,
            name: 'Поиск',
            className: 'submitButton',
            callback: (data: any) => {
              UserController.search({ ...data }).then(
                (user: Omit<User, 'phone' | 'email'>[]) => {
                  this.children.users = new Modal({
                    name: 'Добавить пользователя в чат',
                    close: () => {
                      this.setProps({
                        isUsers: false,
                      });
                    },
                    content: user.map((el) => {
                      const button = new Button({
                        tag: ButtonTag.link,
                        name: el.login,
                        type: ButtonType.button,
                        onClick: () => {
                          ChatsController.addUser({
                            users: [el.id],
                            chatId: this.props.id,
                          });
                          this.setProps({
                            isUsers: false,
                          });
                        },
                      });

                      return button;
                    }),
                  });
                  this.setProps({
                    addUser: false,
                    isUsers: true,
                  });
                },
              );
            },
          },
        }),
      ],
    });

    this.children.messageInput = new Input({
      type: InputType.text,
      name: 'message',
      placeholder: 'Сообщение',
    });

    this.children.send = new Button({
      type: ButtonType.submit,
      name: '➜',
      onClick: (event: MouseEvent | undefined) => {
        event?.preventDefault();
        this.addMessage();
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Page = withStore((store) => ({
  messages: store.messages,
  userId: store.currentUser?.id,
}));

export default Page(Chat);
