import { Button } from '../../../components/button/index.ts';
import { Form } from '../../../components/form/index.ts';
import { ButtonTag, ButtonType } from '../../../constants.ts';
import Block from '../../../utils/block.ts';
import { Router } from '../../../utils/router.ts';
import template from './login.pug';
import { loginInputs } from '../constants.ts';
import AuthController from '../../../api/controllers/auth.ts';

export class LoginPage extends Block {
  constructor() {
    super({
      tagName: 'div',
    });
  }

  init(): void {
    this.children.formLogin = new Form({
      name: 'Вход',
      inputs: loginInputs,
      buttonProps: {
        name: 'Авторизоваться',
        type: ButtonType.submit,
        callback: (data: any) => {
          AuthController.signin(data);
        },
      },
    });

    this.children.buttonSignupForm = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'Нет аккаунта?',
      onClick: () => {
        const router = new Router();
        router.go('/sign-up');
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
