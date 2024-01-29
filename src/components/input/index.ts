import { InputType } from '../../constants.ts';
import Block from '../../utils/block.ts';
import { validateInput } from '../../utils/validate-input.ts';
import template from './input.pug';

type InputProps = {
  type: InputType;
  placeholder: string;
  name: string;
  value?: string;
  message?: string;
  className?: string;
  onEnter?: (event: KeyboardEvent) => void;
  events?: {
    focus: (e: Event) => void;
    blur: (e: Event) => void;
    keypress: (e: KeyboardEvent) => void;
  };
};

export class Input extends Block {
  constructor(props: InputProps) {
    super(
      { tagName: 'span', className: 'inputContainer' },
      {
        ...props,
        events: {
          ...props.events,
          keypress: (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              this.props.onEnter(event);
            }
          },
          focusout: () => {
            const el = this.getContent();
            const input = el!.querySelector('input');
            const message = validateInput(el!).message;
            this.setProps({
              value: input!.value,
              message: message,
            });
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
