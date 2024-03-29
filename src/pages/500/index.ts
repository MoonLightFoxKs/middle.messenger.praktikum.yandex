import { ErrorPage } from '../../components/error/index.ts';
import Block from '../../utils/block.ts';
import template from './500.pug';

export class Error500 extends Block {
  constructor() {
    super({
      tagName: 'div',
    });
  }

  init(): void {
    this.children.errorPage = new ErrorPage({
      imgName: '500',
      text: 'Наташа мы все уронили',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
