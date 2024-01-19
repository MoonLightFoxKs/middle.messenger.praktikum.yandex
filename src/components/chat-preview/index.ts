import { Block } from '../../utils/block';
import template from './chat-preview.pug';

type ChatPreviewProps = {
  id: string | number;
  name: string;
  message: string;
  className?: string;
  onClick?: (event?: MouseEvent) => void;
  events?: {
    click: (event?: MouseEvent) => void;
  };
};

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super(
      {
        tagName: 'div',
        className: 'chatPreviewContainer',
      },
      {
        ...props,
        events: {
          click: props.onClick,
        },
      }
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
