import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { ButtonTag, ButtonType } from '../../constants';
import { Block } from '../../utils/block';
import { render } from '../../utils/render';
import template from './auth.pug';
import { loginInputs, signinInputs } from './constants';

export class AuthPage extends Block {
  constructor() {
    super({
      tagName: 'div',
    });
  }

  init(): void {
    this.children.formLogin = new Form({
      name: 'Вход',
      inputs: loginInputs,
      display: 'none',
      buttonProps: {
        name: 'Авторизоваться',
        type: ButtonType.submit,
        callback: () => render('chat'),
      },
    });

    this.children.buttonSigninForm = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'Нет аккаунта?',
      display: 'none',
      onClick: () => {
        if (!Array.isArray(this.children.formSignin)) {
          this.children.formSignin.show();
        }
        if (!Array.isArray(this.children.buttonLoginForm)) {
          this.children.buttonLoginForm.show();
        }
        if (!Array.isArray(this.children.formLogin)) {
          this.children.formLogin.hide();
        }
        if (!Array.isArray(this.children.buttonSigninForm)) {
          this.children.buttonSigninForm.hide();
        }
      },
    });

    this.children.formSignin = new Form({
      name: 'Регистрация',
      inputs: signinInputs,
      buttonProps: {
        name: 'Зарегистрироваться',
        type: ButtonType.submit,
        callback: () => render('chat'),
      },
    });

    this.children.buttonLoginForm = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'Войти',
      onClick: () => {
        if (!Array.isArray(this.children.formSignin)) {
          this.children.formSignin.hide();
        }
        if (!Array.isArray(this.children.buttonLoginForm)) {
          this.children.buttonLoginForm.hide();
        }
        if (!Array.isArray(this.children.formLogin)) {
          this.children.formLogin.show();
        }
        if (!Array.isArray(this.children.buttonSigninForm)) {
          this.children.buttonSigninForm.show();
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
