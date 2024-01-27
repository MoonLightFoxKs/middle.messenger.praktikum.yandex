import Block from '../../utils/block';
import template from './info-block.pug';

type InfoBlockProps = {
  label: string;
  text: string;
  className?: string;
};

export class InfoBlock extends Block {
  constructor(props: InfoBlockProps) {
    super(
      {
        tagName: 'div',
        className: 'infoBlock',
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
