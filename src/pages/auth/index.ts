import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { ButtonTag, ButtonType } from "../../constants";
import { Block } from "../../utils/block";
import { render } from "../../utils/render";
import template from "./auth.pug";
import { loginInputs, signinInputs } from "./constants";

export class AuthPage extends Block {
  constructor() {
    super({
      tagName: "div",
    });
  }

  init(): void {
    this.children.formLogin = new Form({
      name: "Вход",
      inputs: loginInputs,
      buttonProps: {
        name: "Авторизоваться",
        type: ButtonType.submit,
        // callback: () => render('chats'),
      },
    });

    this.children.buttonSigninForm = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: "Нет аккаунта?",
      onClick: () => {
        const component =
          this.getContent()?.querySelector<HTMLElement>("div#signin");
        component!.removeAttribute("style");
      },
    });

    this.children.formSignin = new Form({
      name: "Регистрация",
      inputs: signinInputs,
      buttonProps: {
        name: "Зарегистрироваться",
        type: ButtonType.submit,
        // callback: () => render('chats'),
      },
    });

    this.children.buttonLoginForm = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: "Войти",
      onClick: () => {
        const component =
          this.getContent()?.querySelector<HTMLElement>("div#signin");
        component!.style.display = "none";
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
