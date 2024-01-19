import { Block } from '../../utils/block';
import template from './input-file.pug';

type InputFileProps = {
  title?: string;
  name: string;
  accept?: string;
  onSubmit?: (event?: Event) => void;
  events?: {
    submit?: (event?: Event) => void;
  };
};

export class InputFile extends Block {
  constructor(props: InputFileProps) {
    super(
      {
        tagName: 'div',
      },
      {
        ...props,
        events: {
          submit: props.onSubmit,
        },
      }
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
