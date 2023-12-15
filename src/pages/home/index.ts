import { Button } from '../../components/button';
import { ButtonTag, ButtonType } from '../../constants';
import { Block } from '../../utils/block';
import { render } from '../../utils/render';
import template from './home.pug';

export class HomePage extends Block {
  constructor() {
    super({
      tagName: 'div',
    });
  }

  init(): void {
    this.children.auth = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'авторизация',
      onClick: () => render('auth'),
    });

    this.children.profile = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'профиль',
      onClick: () => render('profile'),
    });

    this.children.chat = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'чат',
      onClick: () => render('chat'),
    });

    this.children.error500 = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'ошибка 500',
      onClick: () => render('error500'),
    });

    this.children.error404 = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: 'ошибка 404',
      onClick: () => render('error404'),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
