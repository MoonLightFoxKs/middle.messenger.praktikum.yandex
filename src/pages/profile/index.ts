import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { ImgButton } from "../../components/img-button";
import { InfoBlock } from "../../components/info-block";
import { Input } from "../../components/input";
import { ButtonTag, ButtonType } from "../../constants";
import { Block } from "../../utils/block";
import { infoList, passwordList } from "./constants";
import { render } from "../../utils/render";
import template from "./profile.pug";

export class ProfilePage extends Block {
  constructor() {
    super({
      tagName: "div",
    });
  }

  init(): void {
    this.children.backButton = new ImgButton({
      imgSrc: "/img/arrow.svg",
      alt: "back to chats",
      onClick: () => render("chat"),
    });

    this.children.profileImgButton = new ImgButton({
      imgSrc: "/img/photo.svg",
      alt: "profile photo",
      className: "profileImg",
    });

    this.children.infoList = infoList.map(
      (el) =>
        new InfoBlock({
          label: el.label,
          text: el.text!,
        })
    );

    this.children.changeInfo = new Button({
      type: ButtonType.button,
      name: "Изменить данные",
      tag: ButtonTag.button,
      className: "changeButton",
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
      name: "Изменить пароль",
      tag: ButtonTag.button,
      className: "changeButton",
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
      name: "Выйти",
      tag: ButtonTag.button,
      className: "logoutButton",
      onClick: () => render("auth"),
    });

    this.children.changeInfoForm = new Form({
      inputs: infoList.map(
        (el) =>
          new Input({
            type: el.type,
            placeholder: el.label,
            value: el.text,
            name: el.name,
          })
      ),
      buttonProps: {
        name: "Сохранить",
        type: ButtonType.submit,
        callback: () => render("profile"),
      },
      display: "none",
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
        name: "Сохранить",
        type: ButtonType.submit,
        callback: () => render("profile"),
      },
      display: "none",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
