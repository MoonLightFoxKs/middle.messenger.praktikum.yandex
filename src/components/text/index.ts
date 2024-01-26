import { Block } from '../../utils/block';
import template from './text.pug';

type TextProps = {
  text: string;
  className?: string;
};

export class CustomText extends Block {
  constructor(props: TextProps) {
    super(
      {
        tagName: 'h1',
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
