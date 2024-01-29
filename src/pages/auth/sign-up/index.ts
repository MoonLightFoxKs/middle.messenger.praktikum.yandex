import { Button } from '../../../components/button/index.ts';
import { Form } from '../../../components/form/index.ts';
import { ButtonTag, ButtonType } from '../../../constants.ts';
import Block from '../../../utils/block.ts';
import { Router } from '../../../utils/router.ts';
import template from './sign-up.pug';
import { signupInputs } from '../constants.ts';
import AuthController from '../../../api/controllers/auth.ts';

export class SignUpPage extends Block {
  constructor() {
    super({
      tagName: 'div',
    });
  }

  init(): void {
    this.children.formSignup = new Form({
      name: 'Регистрация',
      inputs: signupInputs,
      buttonProps: {
        name: 'Зарегистрироваться',
        type: ButtonType.submit,
        callback: (data: any) => {
          AuthController.signup(data);
        },
      },
    });

    this.children.buttonLoginForm = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'Войти',
      onClick: () => {
        const router = new Router();
        router.go('/');
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
