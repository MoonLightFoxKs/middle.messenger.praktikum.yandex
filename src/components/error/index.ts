import Block from '../../utils/block.ts';
import template from './error.pug';

type ErrorPageProps = {
  imgName: string;
  text: string;
  className?: string;
};

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(
      {
        tagName: 'div',
        className: 'errorContainer',
      },
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
