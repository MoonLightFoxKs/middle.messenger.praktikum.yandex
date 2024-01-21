import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { ImgButton } from '../../components/img-button';
import { InfoBlock } from '../../components/info-block';
import { Input } from '../../components/input';
import { ButtonTag, ButtonType } from '../../constants';
import { Block } from '../../utils/block';
import { infoList, passwordList } from './constants';
import template from './profile.pug';
import AuthController from '../../api/controllers/auth';
import UserController from '../../api/controllers/user';
import store, { StoreEvents, withStore } from '../../utils/store';
import { CustomText } from '../../components/text';
import { Modal } from '../../components/modal';
import { InputFile } from '../../components/input-file';
import { Router } from '../../utils/router';

class ProfilePage extends Block {
  constructor(props: any) {
    super(
      {
        tagName: 'div',
      },
      props
    );

    store.on(StoreEvents.Updated, () => {
      console.log('store', store.getState(), this.children.infoList);
      this.init();
      const user = store.getState().currentUser;
      infoList.map((el, index) => {
        if (
          Array.isArray(this.children.infoList) &&
          !Array.isArray(this.children.infoList[index])
        )
          this.children.infoList[index].setProps({
            text: (user as Record<string, string | number>)[el.name],
          });
      });
      if (!Array.isArray(this.children.userName))
        this.children.userName.setProps({
          text: store.getState().currentUser!.display_name,
        });
      if (!Array.isArray(this.children.profileImgButton))
        this.children.profileImgButton.setProps({
          imgSrc:
            'https://ya-praktikum.tech/api/v2/resources' +
            store.getState().currentUser!.avatar,
        });
    });
  }

  init(): void {
    this.children.userName = new CustomText({
      text: this.props.display_name,
    });

    this.children.backButton = new ImgButton({
      imgSrc: '/img/arrow.svg',
      alt: 'back to chats',
      onClick: () => {
        const router = new Router();
        router.go('/messenger');
      },
    });

    this.children.profileImgButton = new ImgButton({
      imgSrc: this.props.avatar
        ? 'https://ya-praktikum.tech/api/v2/resources' + this.props.avatar
        : '/img/photo.svg',
      alt: 'profile photo',
      className: 'profileImg',
      onClick: () => {
        this.setProps({
          updateUserImg: true,
        });
      },
    });

    this.children.updateUserImgModal = new Modal({
      name: 'Загрузить картинку',
      close: () => {
        this.setProps({
          updateUserImg: false,
        });
      },
      content: [
        new InputFile({
          name: 'avatar',
          onSubmit: (event?: Event) => {
            event?.preventDefault();
            if (!Array.isArray(this.children.updateUserImgModal)) {
              const form = this.children.updateUserImgModal
                .getContent()!
                .querySelector('form') as HTMLFormElement;
              const formData = new FormData(form);

              UserController.updateAvatar(formData);

              this.setProps({
                updateUserImg: false,
              });
            }
          },
        }),
      ],
    });

    this.children.infoList = infoList.map(
      (el) =>
        new InfoBlock({
          label: el.label,
          text: this.props[el.name],
        })
    );

    this.children.changeInfo = new Button({
      type: ButtonType.button,
      name: 'Изменить данные',
      tag: ButtonTag.button,
      className: 'changeButton',
      onClick: () => {
        if (Array.isArray(this.children.infoList)) {
          this.children.infoList.forEach((el) => el.hide());
        }
        if (!Array.isArray(this.children.changeInfoForm)) {
          this.children.changeInfoForm.show();
        }
        if (!Array.isArray(this.children.changePassword)) {
          this.children.changePassword.hide();
        }
        if (!Array.isArray(this.children.logout)) {
          this.children.logout.hide();
        }
        if (!Array.isArray(this.children.changeInfo)) {
          this.children.changeInfo.hide();
        }
      },
    });

    this.children.changePassword = new Button({
      type: ButtonType.button,
      name: 'Изменить пароль',
      tag: ButtonTag.button,
      className: 'changeButton',
      onClick: () => {
        if (Array.isArray(this.children.infoList)) {
          this.children.infoList.forEach((el) => el.hide());
        }
        if (!Array.isArray(this.children.changePasswordForm)) {
          this.children.changePasswordForm.show();
        }
        if (!Array.isArray(this.children.changePassword)) {
          this.children.changePassword.hide();
        }
        if (!Array.isArray(this.children.logout)) {
          this.children.logout.hide();
        }
        if (!Array.isArray(this.children.changeInfo)) {
          this.children.changeInfo.hide();
        }
      },
    });

    this.children.logout = new Button({
      type: ButtonType.button,
      name: 'Выйти',
      tag: ButtonTag.button,
      className: 'logoutButton',
      onClick: () => {
        AuthController.logout();
      },
    });

    this.children.changeInfoForm = new Form({
      inputs: infoList.map(
        (el) =>
          new Input({
            type: el.type,
            placeholder: el.label,
            value: this.props[el.name],
            name: el.name,
          })
      ),
      buttonProps: {
        name: 'Сохранить',
        type: ButtonType.submit,
        callback: async (elem: any) => {
          await UserController.updateProfile(elem);
          if (Array.isArray(this.children.infoList)) {
            this.children.infoList.forEach((el) => el.show());
          }
          if (!Array.isArray(this.children.changeInfoForm)) {
            this.children.changeInfoForm.hide();
          }
          if (!Array.isArray(this.children.changePasswordForm)) {
            this.children.changePasswordForm.hide();
          }
          if (!Array.isArray(this.children.changePassword)) {
            this.children.changePassword.show();
          }
          if (!Array.isArray(this.children.logout)) {
            this.children.logout.show();
          }
          if (!Array.isArray(this.children.changeInfo)) {
            this.children.changeInfo.show();
          }
        },
      },
      display: 'none',
    });

    this.children.changePasswordForm = new Form({
      inputs: passwordList.map(
        (el) =>
          new Input({
            type: el.type,
            placeholder: el.label,
            name: el.name,
          })
      ),
      buttonProps: {
        name: 'Сохранить',
        type: ButtonType.submit,
        callback: (elem: any) => {
          UserController.updatePassword(elem).then(() => {
            if (Array.isArray(this.children.infoList)) {
              this.children.infoList.forEach((el) => el.show());
            }
            if (!Array.isArray(this.children.changeInfoForm)) {
              this.children.changeInfoForm.hide();
            }
            if (!Array.isArray(this.children.changePasswordForm)) {
              this.children.changePasswordForm.hide();
            }
            if (!Array.isArray(this.children.changePassword)) {
              this.children.changePassword.show();
            }
            if (!Array.isArray(this.children.logout)) {
              this.children.logout.show();
            }
            if (!Array.isArray(this.children.changeInfo)) {
              this.children.changeInfo.show();
            }
          });
        },
      },
      display: 'none',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const Page = withStore((state) => ({ ...state.currentUser }));

export default Page(ProfilePage);
