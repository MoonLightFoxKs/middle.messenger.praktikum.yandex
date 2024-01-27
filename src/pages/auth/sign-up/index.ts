import { Button } from '../../../components/button';
import { Form } from '../../../components/form';
import { ButtonTag, ButtonType } from '../../../constants';
import Block from '../../../utils/block';
import { Router } from '../../../utils/router';
import template from './sign-up.pug';
import { signupInputs } from '../constants';
import AuthController from '../../../api/controllers/auth';

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
